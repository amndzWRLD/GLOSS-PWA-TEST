import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/home'), 2000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-bg">
      <h1 className="text-6xl font-bold mb-4">
        GL<span className="text-gloss-yellow">O</span>SS
      </h1>
      <p className="text-gray-400 uppercase tracking-wider font-body">Find Your Detailer</p>
      <div className="mt-8 w-2 h-2 bg-gloss-yellow rounded-full animate-pulse" />
    </div>
  )
}
