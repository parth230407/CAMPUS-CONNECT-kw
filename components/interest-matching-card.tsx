"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, Users, MessageCircle } from "lucide-react"
import { useState } from "react"

interface InterestGroup {
  id: string
  name: string
  description: string
  interests: string[]
  memberCount: number
  matchScore: number
  isJoined: boolean
}

interface InterestMatchingCardProps {
  group: InterestGroup
  onJoin?: (groupId: string) => void
  onLeave?: (groupId: string) => void
  onViewMembers?: (groupId: string) => void
}

export function InterestMatchingCard({ group, onJoin, onLeave, onViewMembers }: InterestMatchingCardProps) {
  const [isJoining, setIsJoining] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [isViewing, setIsViewing] = useState(false)
  const [currentlyJoined, setCurrentlyJoined] = useState(group.isJoined)

  const handleJoin = async () => {
    setIsJoining(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onJoin?.(group.id)
      setCurrentlyJoined(true)
      console.log("[v0] Joined group:", group.name)
    } finally {
      setIsJoining(false)
    }
  }

  const handleLeave = async () => {
    setIsLeaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      onLeave?.(group.id)
      setCurrentlyJoined(false)
      console.log("[v0] Left group:", group.name)
    } finally {
      setIsLeaving(false)
    }
  }

  const handleViewMembers = async () => {
    setIsViewing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      onViewMembers?.(group.id)
      console.log("[v0] Viewing members of group:", group.name)
    } finally {
      setIsViewing(false)
    }
  }

  return (
    <Card className="border-border/50 hover:shadow-lg transition-all hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{group.name}</CardTitle>
            <CardDescription className="text-sm">{group.description}</CardDescription>
          </div>
          <Badge variant={group.matchScore > 70 ? "default" : "secondary"} className="ml-2">
            {group.matchScore}% match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Interest Compatibility</span>
            <span className="font-medium">{group.matchScore}%</span>
          </div>
          <Progress value={group.matchScore} className="h-2" />
        </div>

        <div className="flex flex-wrap gap-1">
          {group.interests.slice(0, 3).map((interest, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {interest}
            </Badge>
          ))}
          {group.interests.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{group.interests.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{group.memberCount} members</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>Active community</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={handleViewMembers}
            disabled={isViewing}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            {isViewing ? "Loading..." : "View Members"}
          </Button>
          {currentlyJoined ? (
            <Button size="sm" variant="secondary" className="flex-1" onClick={handleLeave} disabled={isLeaving}>
              {isLeaving ? "Leaving..." : "Leave Group"}
            </Button>
          ) : (
            <Button size="sm" className="flex-1" onClick={handleJoin} disabled={isJoining}>
              {isJoining ? "Joining..." : "Join Group"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
