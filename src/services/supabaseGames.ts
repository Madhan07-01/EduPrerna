// src/services/supabaseGames.ts
// PURPOSE: Supabase service for STEM daily challenges (catalog, schedule, progress, points)
// AUTH: Firebase remains the ONLY authentication; we read UID via Firebase and store in Supabase rows.

import { supabase } from '../supabase/client'
import { auth } from '../firebase/firebaseConfig'

export type Subject = 'Mathematics' | 'Science' | 'Technology' | 'Engineering'

export type Challenge = {
  id: string
  title: string
  subject: Subject
  grade: number
  game_type: string
  config: Record<string, any>
  is_active: boolean
}

// Format local date as YYYY-MM-DD (avoids UTC off-by-one issues)
function localYMD(d = new Date()) {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export async function fetchDailyChallenge(grade: number, subject: Subject, dateISO?: string) {
  const date = dateISO ? dateISO.slice(0, 10) : localYMD()

  const { data: schedule, error: schedErr } = await supabase
    .from('daily_challenge_schedule')
    .select('challenge_id')
    .eq('date', date)
    .eq('grade', grade)
    .eq('subject', subject)
    .maybeSingle()
  if (schedErr) throw schedErr
  if (!schedule) {
    // Fallback: no schedule for today -> pick first active challenge for this grade/subject
    const { data: fallback, error: fbErr } = await supabase
      .from('stem_challenges')
      .select('*')
      .eq('grade', grade)
      .eq('subject', subject)
      .eq('is_active', true)
      .order('created_at', { ascending: true })
      .limit(1)
    if (fbErr) throw fbErr
    if (!fallback || fallback.length === 0) return null
    console.info('[STEM] No schedule for', { date, grade, subject }, 'falling back to first active challenge')
    return fallback[0] as Challenge
  }

  const { data: challenges, error: chErr } = await supabase
    .from('stem_challenges')
    .select('*')
    .eq('id', schedule.challenge_id)
    .eq('is_active', true)
    .limit(1)
  if (chErr) throw chErr
  if (!challenges || challenges.length === 0) return null

  return challenges[0] as Challenge
}

export async function listChallenges(grade: number, subject: Subject) {
  const { data, error } = await supabase
    .from('stem_challenges')
    .select('*')
    .eq('grade', grade)
    .eq('subject', subject)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as Challenge[]
}

export async function submitAttempt(params: {
  challenge_id: string
  grade: number
  subject: Subject
  score: number
  completed: boolean
  time_taken_seconds: number
  meta?: Record<string, any>
}) {
  const user_uid = auth.currentUser?.uid
  if (!user_uid) throw new Error('User not authenticated (Firebase)')

  const { data, error } = await supabase
    .from('student_progress')
    .insert([
      {
        user_uid,
        challenge_id: params.challenge_id,
        grade: params.grade,
        subject: params.subject,
        score: params.score,
        completed: params.completed,
        time_taken_seconds: params.time_taken_seconds,
        meta: params.meta ?? null,
      },
    ])
    .select('*')
    .single()

  if (error) throw error
  return data
}

export async function addPoints(delta: number) {
  const user_uid = auth.currentUser?.uid
  if (!user_uid) throw new Error('User not authenticated (Firebase)')

  // Try get current points
  const { data: existing, error: getErr } = await supabase
    .from('student_points')
    .select('*')
    .eq('user_uid', user_uid)
    .maybeSingle()
  if (getErr) throw getErr

  if (!existing) {
    const { data, error: insErr } = await supabase
      .from('student_points')
      .insert([{ user_uid, total_points: delta }])
      .select('*')
      .single()
    if (insErr) throw insErr
    return data.total_points as number
  }

  const { data: updated, error: updErr } = await supabase
    .from('student_points')
    .update({ total_points: (existing.total_points ?? 0) + delta })
    .eq('user_uid', user_uid)
    .select('*')
    .single()
  if (updErr) throw updErr

  return updated.total_points as number
}

export async function getMyPoints() {
  const user_uid = auth.currentUser?.uid
  if (!user_uid) return 0

  const { data, error } = await supabase
    .from('student_points')
    .select('total_points')
    .eq('user_uid', user_uid)
    .maybeSingle()
  if (error) throw error

  return data?.total_points ?? 0
}

// Leaderboard: top N by total_points
export async function getLeaderboard(limit = 20) {
  const { data, error } = await supabase
    .from('student_points')
    .select('user_uid, total_points')
    .order('total_points', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data ?? []
}

// Current user's recent attempts
export async function getMyRecentAttempts(limit = 20) {
  const user_uid = auth.currentUser?.uid
  if (!user_uid) return []

  const { data, error } = await supabase
    .from('student_progress')
    .select('*, challenge:stem_challenges(title, game_type)')
    .eq('user_uid', user_uid)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data ?? []
}
