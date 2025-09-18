import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type React from 'react'

export default function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { currentUser, loading } = useAuth()
  if (loading) return null
  return currentUser ? children : <Navigate to="/login" replace />
}


