// src/hooks/useSupabaseDatasets.ts
// A simple React hook to manage Supabase-backed datasets

import { useCallback, useEffect, useState } from 'react'
import {
  createDataset,
  listMyDatasets,
  type NewDataset,
  updateDataset,
  deleteDataset,
} from '../services/supabaseNewData'

export function useSupabaseDatasets() {
  const [items, setItems] = useState<NewDataset[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await listMyDatasets()
      setItems(data)
    } catch (e: any) {
      setError(e.message || 'Failed to fetch datasets')
    } finally {
      setLoading(false)
    }
  }, [])

  const add = useCallback(
    async (payload: { title: string; content?: Record<string, unknown> }) => {
      try {
        setLoading(true)
        setError(null)
        await createDataset(payload)
        await refresh()
      } catch (e: any) {
        setError(e.message || 'Failed to create dataset')
      } finally {
        setLoading(false)
      }
    },
    [refresh]
  )

  const edit = useCallback(
    async (id: string, updates: Partial<NewDataset>) => {
      try {
        setLoading(true)
        setError(null)
        await updateDataset(id, updates)
        await refresh()
      } catch (e: any) {
        setError(e.message || 'Failed to update dataset')
      } finally {
        setLoading(false)
      }
    },
    [refresh]
  )

  const remove = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        setError(null)
        await deleteDataset(id)
        await refresh()
      } catch (e: any) {
        setError(e.message || 'Failed to delete dataset')
      } finally {
        setLoading(false)
      }
    },
    [refresh]
  )

  useEffect(() => {
    refresh()
  }, [refresh])

  return { items, loading, error, refresh, add, edit, remove }
}
