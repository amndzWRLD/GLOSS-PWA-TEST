import { useNavigate } from 'react-router-dom'

export default function Header({ title, showBack = false }) {
  const navigate = useNavigate()

  return (
    <header className="flex items-center justify-between p-4 border-b border-dark-border">
      {showBack && (
        <button onClick={() => navigate(-1)} className="text-2xl">←</button>
      )}
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="w-8" />
    </header>
  )
}
