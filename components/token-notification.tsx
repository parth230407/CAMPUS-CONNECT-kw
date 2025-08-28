"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, X, CheckCircle } from "lucide-react"

interface TokenNotificationProps {
  tokens: number
  activity: string
  onDismiss?: () => void
  autoHide?: boolean
  duration?: number
}

export function TokenNotification({
  tokens,
  activity,
  onDismiss,
  autoHide = true,
  duration = 5000,
}: TokenNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onDismiss?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [autoHide, duration, onDismiss])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
      <Card className="border-accent/20 bg-accent/5 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Coins className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="font-semibold text-foreground">+{tokens} Tokens Earned!</span>
              </div>
              <p className="text-sm text-muted-foreground">{activity}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsVisible(false)
                onDismiss?.()
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
