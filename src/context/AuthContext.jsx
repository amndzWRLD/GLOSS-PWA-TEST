import { createContext, useContext, useState } from 'react'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ email: 'demo@gloss.com' })
  const [loading, setLoading] = useState(false)

  const value = {
    user,
    loading,
    signIn: async (email, password) => {
      setUser({ email })
      return { data: { user: { email } }, error: null }
    },
    signUp: async (email, password) => {
      setUser({ email })
      return { data: { user: { email } }, error: null }
    },
    signOut: async () => {
      setUser(null)
      return { error: null }
    }
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
