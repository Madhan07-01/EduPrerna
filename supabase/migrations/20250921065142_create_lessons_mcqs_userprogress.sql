-- lessons table
CREATE TABLE lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grade int NOT NULL,
  subject text NOT NULL,
  title text NOT NULL,
  content text NOT NULL
);

-- mcqs table
CREATE TABLE mcqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id),
  question text NOT NULL,
  options jsonb NOT NULL,
  answer text NOT NULL
);

-- user_progress table
CREATE TABLE user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_uid uuid NOT NULL,
  lesson_id uuid REFERENCES lessons(id),
  mcq_score int,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
