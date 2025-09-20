-- supabase/schema_seed.sql
-- Schema + seed for STEM games (Mathematics, Science, Technology, Engineering) for grades 6–10.
-- Run this in Supabase SQL Editor. Safe to re-run.

-- 1) Types and tables
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subject_enum') THEN
    CREATE TYPE subject_enum AS ENUM ('Mathematics', 'Science', 'Technology', 'Engineering');
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS public.stem_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject subject_enum NOT NULL,
  grade int NOT NULL CHECK (grade BETWEEN 6 AND 12),
  game_type text NOT NULL,
  config jsonb NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.daily_challenge_schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  grade int NOT NULL CHECK (grade BETWEEN 6 AND 12),
  subject subject_enum NOT NULL,
  challenge_id uuid NOT NULL REFERENCES public.stem_challenges(id) ON DELETE CASCADE,
  UNIQUE (date, grade, subject)
);

CREATE TABLE IF NOT EXISTS public.student_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_uid text NOT NULL,
  challenge_id uuid NOT NULL REFERENCES public.stem_challenges(id) ON DELETE CASCADE,
  grade int NOT NULL,
  subject subject_enum NOT NULL,
  score numeric DEFAULT 0,
  completed boolean DEFAULT false,
  time_taken_seconds int DEFAULT 0,
  meta jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.student_points (
  user_uid text PRIMARY KEY,
  total_points int NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS student_points_touch ON public.student_points;
CREATE TRIGGER student_points_touch
BEFORE UPDATE ON public.student_points
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- 2) Seed baseline catalog for all grades 6..10 and all STEM subjects
WITH grades AS (
  SELECT generate_series(6, 12) AS grade
)
INSERT INTO public.stem_challenges (title, subject, grade, game_type, config)
SELECT
  CASE s.subject
    WHEN 'Mathematics' THEN 'Math Challenge — ' || s.game_type || ' — Grade ' || g.grade
    WHEN 'Science' THEN 'Science Challenge — ' || s.game_type || ' — Grade ' || g.grade
    WHEN 'Technology' THEN 'Tech Challenge — ' || s.game_type || ' — Grade ' || g.grade
    WHEN 'Engineering' THEN 'Engineering Challenge — ' || s.game_type || ' — Grade ' || g.grade
  END AS title,
  s.subject::subject_enum,
  g.grade,
  s.game_type,
  jsonb_build_object('difficulty', 'easy', 'game_type', s.game_type, 'seed', g.grade)
FROM grades g
CROSS JOIN (
  VALUES
    ('Mathematics','arithmetic_shooter'),
    ('Mathematics','number_patterns'),
    ('Mathematics','maze_math'),
    ('Science','periodic_match'),
    ('Science','body_systems'),
    ('Science','physics_concepts'),
    ('Technology','code_debug'),
    ('Technology','algorithm_maze'),
    ('Engineering','circuit_puzzle'),
    ('Engineering','build_solve')
) AS s(subject, game_type)
WHERE NOT EXISTS (
  SELECT 1 FROM public.stem_challenges c
  WHERE c.subject::text = s.subject
    AND c.game_type = s.game_type
    AND c.grade = g.grade
);

-- 3) Schedule today for each grade & subject
INSERT INTO public.daily_challenge_schedule (date, grade, subject, challenge_id)
SELECT
  current_date,
  g.grade,
  s.subject::subject_enum,
  (
    SELECT id FROM public.stem_challenges c
    WHERE c.grade = g.grade
      AND c.subject::text = s.subject
      AND c.is_active
    ORDER BY c.created_at ASC
    LIMIT 1
  ) AS challenge_id
FROM (SELECT generate_series(6,12) AS grade) g
CROSS JOIN (
  VALUES ('Mathematics'),('Science'),('Technology'),('Engineering')
) AS s(subject)
WHERE NOT EXISTS (
  SELECT 1 FROM public.daily_challenge_schedule d
  WHERE d.date = current_date
    AND d.grade = g.grade
    AND d.subject::text = s.subject
);

-- 4) Optional: You can rotate challenges daily by updating the schedule with a different challenge_id.
