// src/services/supabaseNewData.ts
// PURPOSE: Use Supabase to store NEW datasets while keeping Firebase as the ONLY auth provider.
// We tag each row with the current Firebase user's UID for association.
// For production-grade security, proxy these through a server that verifies Firebase ID tokens
// and uses Supabase Service Role key. Do NOT put service role keys in frontend code.

import { supabase } from '../supabase/client'
import { auth } from '../firebase/firebaseConfig'

export type NewDataset = {
  id?: string
  user_uid?: string | null
  title: string
  content?: Record<string, unknown> | null
  status?: 'active' | 'archived' | string
  created_at?: string
  updated_at?: string
}

// Create a dataset, tagging with Firebase UID
export async function createDataset(payload: Omit<NewDataset, 'id' | 'user_uid' | 'created_at' | 'updated_at'>) {
  const user_uid = auth.currentUser?.uid ?? null

  const { data, error } = await supabase
    .from('new_datasets')
    .insert([{ ...payload, user_uid }])
    .select('*')
    .single()

  if (error) throw error
  return data as NewDataset
}

// List datasets for the current Firebase user
export async function listMyDatasets() {
  const user_uid = auth.currentUser?.uid ?? null
  if (!user_uid) return []

  const { data, error } = await supabase
    .from('new_datasets')
    .select('*')
    .eq('user_uid', user_uid)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as NewDataset[]
}

// Get single dataset by id
export async function getDatasetById(id: string) {
  const { data, error } = await supabase
    .from('new_datasets')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as NewDataset
}

// Update dataset (no ownership enforcement on client; enforce via RLS/server in production)
export async function updateDataset(id: string, updates: Partial<NewDataset>) {
  const { data, error } = await supabase
    .from('new_datasets')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return data as NewDataset
}

// Delete dataset
export async function deleteDataset(id: string) {
  const { error } = await supabase
    .from('new_datasets')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}
