import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
    return { data, error }
  }

  const updateUserFromSession = async (session) => {
    if (session?.user) {
      try {
        let { data: profile, error } = await fetchProfile(session.user.id)
        if (error && error.code === 'PGRST116') { // Profile not found
          const { error: insertError } = await supabase.from('profiles').insert({
            id: session.user.id,
            email: session.user.email
          })
          if (insertError) {
            console.error('Failed to insert profile:', insertError)
          } else {
            const { data: newProfile, error: fetchError } = await fetchProfile(session.user.id)
            if (fetchError) {
              console.error('Failed to fetch profile after insert:', fetchError)
            } else {
              profile = newProfile
            }
          }
        } else if (error) {
          console.error('Failed to fetch profile:', error)
        }
        setUser(profile || null)
      } catch (err) {
        console.error('Error in profile handling:', err)
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    // Obtener sesión activa al montar
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)
      await updateUserFromSession(session)
      setLoading(false)
    })

    // Escuchar cambios de auth en tiempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      await updateUserFromSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    session,
    loading,
    signIn: async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      return { data, error }
    },
    signUp: async (email, password) => {
      console.log('SIGNUP CALL:', { email, password })
      const { data, error } = await supabase.auth.signUp({ email, password })
      console.log('SUPABASE RESPONSE:', { data, error })
      return { data, error }
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut()
      return { error }
    },
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
