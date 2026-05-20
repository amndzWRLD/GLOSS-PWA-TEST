import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, hasSupabaseConfig } from '../utils/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  const getFallbackUser = (authUser) => ({
    id: authUser.id,
    email: authUser.email,
    role: authUser.app_metadata?.role || 'customer'
  })

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
    return { data, error }
  }

  const updateUserFromSession = async (session) => {
    if (session?.user) {
      const authUser = session.user
      const fallbackUser = getFallbackUser(authUser)

      setUser(fallbackUser)

      try {
        let { data: profile, error } = await fetchProfile(authUser.id)
        if (error && error.code === 'PGRST116') { // Profile not found
          const { error: insertError } = await supabase.from('profiles').insert({
            id: authUser.id,
            email: authUser.email
          })
          if (insertError) {
            console.error('Failed to insert profile:', insertError)
          } else {
            const { data: newProfile, error: fetchError } = await fetchProfile(authUser.id)
            if (fetchError) {
              console.error('Failed to fetch profile after insert:', fetchError)
            } else {
              profile = newProfile
            }
          }
        } else if (error) {
          console.error('Failed to fetch profile:', error)
        }
        setUser(profile || fallbackUser)
      } catch (err) {
        console.error('Error in profile handling:', err)
        setUser(fallbackUser)
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user) {
        setUser(getFallbackUser(session.user))
        setTimeout(() => {
          updateUserFromSession(session)
        }, 0)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    session,
    loading,
    signIn: async (email, password) => {
      if (!hasSupabaseConfig) {
        return { data: null, error: { message: 'Configuración de autenticación incompleta. Verifica variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.' } }
      }
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
          const serverError = error.status && Number(error.status) >= 500
          return {
            data: null,
            error: {
              message: serverError
                ? 'El servidor de autenticación está temporalmente no disponible (503). Intenta de nuevo en unos minutos.'
                : error.message
            }
          }
        }
        setSession(data.session)
        await updateUserFromSession(data.session)
        return { data, error: null }
      } catch (_err) {
        return { data: null, error: { message: 'No se pudo conectar al servidor de autenticación. Revisa tu conexión o la URL de Supabase.' } }
      }
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
