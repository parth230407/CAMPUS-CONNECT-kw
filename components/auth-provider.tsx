"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type StacksUser, getUserData, isSignedIn, handlePendingSignIn } from "@/lib/auth"

interface AuthContextType {
  user: StacksUser | null
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<StacksUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await handlePendingSignIn()

        const authenticated = isSignedIn()
        setIsAuthenticated(authenticated)

        if (authenticated) {
          const userData = getUserData()
          setUser(userData)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("[v0] Auth check failed:", error)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    const handleAuthChange = () => {
      checkAuth()
    }

    window.addEventListener("storage", handleAuthChange)
    window.addEventListener("stacksAuthComplete", handleAuthChange)

    return () => {
      window.removeEventListener("storage", handleAuthChange)
      window.removeEventListener("stacksAuthComplete", handleAuthChange)
    }
  }, [])

  return <AuthContext.Provider value={{ user, isAuthenticated, isLoading }}>{children}</AuthContext.Provider>
}
