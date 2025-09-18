import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type React from 'react'

export default function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? children : <Navigate to="/login" replace />
}


