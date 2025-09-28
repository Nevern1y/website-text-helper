"use client"

import { createContext, useContext, useMemo } from "react"
import { useAuth, type AuthUser } from "@/hooks/use-auth"

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  setUser: (user: AuthUser | null) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, error, refresh, setUser } = useAuth()

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      refresh,
      setUser,
    }),
    [user, loading, error, refresh, setUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext должен использоваться внутри AuthProvider")
  }
  return context
}
