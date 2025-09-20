// src/components/SupabaseDatasetsDemo.tsx
// Demonstrates using Supabase for NEW datasets while keeping Firebase auth untouched.
// Renders a small UI to add and list datasets tied to current Firebase user (by UID).

import { useState } from 'react'
import { useSupabaseDatasets } from '../hooks/useSupabaseDatasets'

export default function SupabaseDatasetsDemo() {
  const { items, loading, error, add, refresh } = useSupabaseDatasets()
  const [title, setTitle] = useState('')

  return (
    <div className="p-4 border rounded">
      <h2 className="font-semibold mb-2">Supabase New Datasets (Firebase auth intact)</h2>
      <p className="text-sm text-gray-600 mb-4">
        Firebase is still the only authentication provider. Supabase stores new datasets only.
      </p>

      <div className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Dataset title"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={() => title && add({ title, content: { createdAt: new Date().toISOString() } })}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Add
        </button>
        <button onClick={refresh} className="bg-gray-600 text-white px-3 py-2 rounded">Refresh</button>
      </div>

      {loading && <div>Loading…</div>}
      {error && <div className="text-red-600">Error: {error}</div>}

      <ul className="list-disc pl-6">
        {items.map((item) => (
          <li key={item.id}>
            <div className="font-medium">{item.title}</div>
            <div className="text-xs text-gray-500">{item.id}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
