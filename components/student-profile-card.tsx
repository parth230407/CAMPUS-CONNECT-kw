"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, UserPlus } from "lucide-react"
import { useState } from "react"

interface StudentProfileCardProps {
  student: {
    id: string
    name: string
    major: string
    year: string
    bio: string
    interests: string[]
    stacksId: string
    connections: number
    tokensEarned: number
  }
  onConnect?: (studentId: string) => void
  onMessage?: (studentId: string) => void
}

export function StudentProfileCard({ student, onConnect, onMessage }: StudentProfileCardProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isMessaging, setIsMessaging] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      onConnect?.(student.id)
      setIsConnected(true)
      console.log("[v0] Connected with student:", student.name)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleMessage = async () => {
    setIsMessaging(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
      onMessage?.(student.id)
      console.log("[v0] Opening message with student:", student.name)
    } finally {
      setIsMessaging(false)
    }
  }

  return (
    <Card className="border-border/50 hover:shadow-lg transition-all hover:-translate-y-1">
      <CardHeader>
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl font-bold text-primary">
            {student.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <CardTitle className="text-center text-lg">{student.name}</CardTitle>
        <CardDescription className="text-center">
          {student.major} • {student.year}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground text-center line-clamp-2">{student.bio}</p>

        <div className="flex flex-wrap gap-1 justify-center">
          {student.interests.slice(0, 4).map((interest, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {interest}
            </Badge>
          ))}
          {student.interests.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{student.interests.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{student.connections} connections</span>
          <span>{student.tokensEarned} tokens</span>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={handleMessage}
            disabled={isMessaging}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            {isMessaging ? "Sending..." : "Message"}
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={handleConnect}
            disabled={isConnecting || isConnected}
            variant={isConnected ? "secondary" : "default"}
          >
            <UserPlus className="w-4 h-4 mr-1" />
            {isConnecting ? "Connecting..." : isConnected ? "Connected" : "Connect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
