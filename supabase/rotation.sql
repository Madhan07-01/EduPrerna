-- supabase/rotation.sql
-- Nightly rotation for daily_challenge_schedule so each day a new challenge is scheduled per grade/subject.
-- 1) Create a helper function that picks the next challenge (round-robin by created_at) for a given grade/subject.
-- 2) Create a function to schedule for a given date across all grades/subjects.
-- 3) Use Supabase Scheduled Jobs to call select public.rotate_daily_challenges(current_date); nightly.

create or replace function public.next_challenge_id(p_grade int, p_subject subject_enum)
returns uuid as $$
declare
  cur uuid;
  last uuid;
begin
  -- Find last scheduled challenge for this grade/subject
  select challenge_id into last
  from public.daily_challenge_schedule
  where grade = p_grade and subject = p_subject
  order by date desc
  limit 1;

  if last is null then
    -- No previous schedule: pick the first by created_at
    select id into cur from public.stem_challenges
    where grade = p_grade and subject = p_subject and is_active
    order by created_at asc
    limit 1;
  else
    -- Pick the next challenge with created_at greater than last's created_at; wrap to first if none
    select c2.id into cur
    from public.stem_challenges c1
    join public.stem_challenges c2 on c2.grade = c1.grade and c2.subject = c1.subject and c2.is_active
    where c1.id = last and c2.created_at > c1.created_at
    order by c2.created_at asc
    limit 1;

    if cur is null then
      -- Wrap to first
      select id into cur from public.stem_challenges
      where grade = p_grade and subject = p_subject and is_active
      order by created_at asc
      limit 1;
    end if;
  end if;

  return cur;
end;
$$ language plpgsql stable;

create or replace function public.rotate_daily_challenges(p_date date)
returns void as $$
declare
  g int;
  s subject_enum;
  cid uuid;
begin
  for g in 6..10 loop
    for s in select unnest(enum_range(null::subject_enum)) loop
      select public.next_challenge_id(g, s) into cid;
      if cid is not null then
        insert into public.daily_challenge_schedule(date, grade, subject, challenge_id)
        values (p_date, g, s, cid)
        on conflict (date, grade, subject) do update set challenge_id = excluded.challenge_id;
      end if;
    end loop;
  end loop;
end;
$$ language plpgsql volatile;

-- After creating the functions, you can run a one-off rotation like:
-- select public.rotate_daily_challenges(current_date);
-- and force PostgREST to reload schema if needed:
-- select pg_notify('pgrst', 'reload schema');

-- To schedule nightly via Supabase Scheduled Jobs (Dashboard → Edge Functions → Scheduled):
-- Create a job that runs daily at 00:05 UTC with SQL:
--   select public.rotate_daily_challenges(current_date);
