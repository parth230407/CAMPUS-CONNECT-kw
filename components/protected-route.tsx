"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { authenticate } from "@/lib/auth"
import { Wallet, Users } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Connect Your Stacks ID</CardTitle>
              <CardDescription>
                You need to connect your Stacks ID to access this feature and start connecting with other students.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={authenticate} className="w-full bg-primary hover:bg-primary/90">
                <Wallet className="w-4 h-4 mr-2" />
                Connect with Stacks ID
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Your Stacks ID keeps your personal information private while allowing you to connect with fellow
                students.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  return <>{children}</>
}
