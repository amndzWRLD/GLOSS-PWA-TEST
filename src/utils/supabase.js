// Mock Supabase client for frontend preview
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    signInWithPassword: async ({ email, password }) => ({ 
      data: { user: { email } }, 
      error: null 
    }),
    signUp: async ({ email, password }) => ({ 
      data: { user: { email } }, 
      error: null 
    }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  }
}
