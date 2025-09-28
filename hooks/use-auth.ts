"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api-client"

export type AuthUser = {
  id: string
  email: string
  name: string
  subscriptionPlan: string
  subscriptionExpiresAt?: string | null
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = async () => {
    setLoading(true)
    try {
      const { user } = await apiClient.currentUser()
      setUser(user)
      setError(null)
    } catch (error) {
      setUser(null)
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, loading, error, refresh, setUser }
}
