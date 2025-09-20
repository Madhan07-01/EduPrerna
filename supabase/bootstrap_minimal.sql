-- supabase/bootstrap_minimal.sql
-- Minimal bootstrap to create core tables and verify connectivity fast.
-- Run this first if schema_seed.sql fails or REST cache hasn't reloaded.

-- Ensure uuid generator is available
create extension if not exists pgcrypto;

-- Create enum once
do $$
begin
  if not exists (select 1 from pg_type where typname = 'subject_enum') then
    create type subject_enum as enum ('Mathematics', 'Science', 'Technology', 'Engineering');
  end if;
end$$;

-- Core tables
create table if not exists public.stem_challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject subject_enum not null,
  grade int not null check (grade between 6 and 10),
  game_type text not null,
  config jsonb not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.daily_challenge_schedule (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  grade int not null check (grade between 6 and 10),
  subject subject_enum not null,
  challenge_id uuid not null references public.stem_challenges(id) on delete cascade,
  unique (date, grade, subject)
);

-- Force PostgREST to reload schema so REST endpoints see new tables immediately
select pg_notify('pgrst', 'reload schema');

-- Smoke test: Insert one Math challenge (Grade 6) and schedule today
insert into public.stem_challenges (title, subject, grade, game_type, config)
values (
  'Arithmetic Shooter — Grade 6', 'Mathematics', 6, 'arithmetic_shooter',
  '{"difficulty":"easy","game_type":"arithmetic_shooter"}'::jsonb
) on conflict do nothing;

insert into public.daily_challenge_schedule (date, grade, subject, challenge_id)
select current_date, 6, 'Mathematics', (
  select id from public.stem_challenges where subject='Mathematics' and grade=6 limit 1
) on conflict do nothing;

-- Reload schema after DML (usually not necessary, but useful during bootstrap)
select pg_notify('pgrst', 'reload schema');
