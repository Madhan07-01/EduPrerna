import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function GoogleSignInButton() {
  const { signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      await signInWithGoogle()
      navigate('/dashboard')
    } catch (e: any) {
      alert(e?.message || 'Google sign-in failed')
    }
  }

  return (
    <button onClick={handleClick} className="w-full rounded-md bg-white text-gray-900 px-3 py-2 text-sm ring-1 ring-gray-300 hover:bg-gray-50 dark:bg-gray-100">
      Sign in with Google
    </button>
  )
}


