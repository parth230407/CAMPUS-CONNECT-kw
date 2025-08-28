"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { TokenBalanceCard } from "@/components/token-balance-card"
import { ActivityFeed } from "@/components/activity-feed"
import { AchievementsGrid } from "@/components/achievements-grid"
import { getTokenBalance, getRecentActivities, getAchievements, getAvailableActivities } from "@/lib/rewards"
import { Users, Coins, Trophy, TrendingUp, Gift } from "lucide-react"

function RewardsContent() {
  const [tokenBalance] = useState(getTokenBalance())
  const [recentActivities] = useState(getRecentActivities())
  const [achievements] = useState(getAchievements())
  const [availableActivities] = useState(getAvailableActivities())

  const unlockedAchievements = achievements.filter((a) => a.unlocked).length
  const totalTokensFromAchievements = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.tokens, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Coins className="w-6 h-6 text-accent" />
            <h2 className="text-3xl font-bold text-foreground">Rewards Center</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Earn tokens by connecting with fellow students and participating in campus activities
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Coins className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{tokenBalance.total}</div>
              <div className="text-sm text-muted-foreground">Total Tokens</div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{unlockedAchievements}</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{recentActivities.length}</div>
              <div className="text-sm text-muted-foreground">Recent Activities</div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{totalTokensFromAchievements}</div>
              <div className="text-sm text-muted-foreground">Bonus Tokens</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Token Balance */}
          <div className="lg:col-span-1">
            <TokenBalanceCard balance={tokenBalance} className="mb-6" />

            {/* Quick Actions */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Quick Earn</CardTitle>
                <CardDescription>Fast ways to earn tokens today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Make a Connection (+10 tokens)
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Trophy className="w-4 h-4 mr-2" />
                  Join a Study Group (+15 tokens)
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Coins className="w-4 h-4 mr-2" />
                  Complete Daily Check-in (+5 tokens)
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Activities and Achievements */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="activities" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="activities">Recent Activity</TabsTrigger>
                <TabsTrigger value="available">Available Tasks</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="activities">
                <ActivityFeed activities={recentActivities} />
              </TabsContent>

              <TabsContent value="available">
                <ActivityFeed activities={availableActivities} title="Available Activities" showActions={true} />
              </TabsContent>

              <TabsContent value="achievements">
                <AchievementsGrid achievements={achievements} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Leaderboard Preview */}
        <Card className="border-border/50 mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Campus Leaderboard
            </CardTitle>
            <CardDescription>Top token earners this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { rank: 1, nickname: "TechWiz", tokens: 412, badge: "🥇" },
                { rank: 2, nickname: "CodeMaster", tokens: 289, badge: "🥈" },
                { rank: 3, nickname: "StudyBuddy", tokens: 234, badge: "🥉" },
                { rank: 4, nickname: "You", tokens: tokenBalance.total, badge: "" },
                { rank: 5, nickname: "GameDev", tokens: 145, badge: "" },
              ].map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">{user.badge || `#${user.rank}`}</span>
                    </div>
                    <span className={`font-medium ${user.nickname === "You" ? "text-primary" : "text-foreground"}`}>
                      {user.nickname}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-accent" />
                    <span className="font-semibold">{user.tokens}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function RewardsPage() {
  return (
    <ProtectedRoute>
      <RewardsContent />
    </ProtectedRoute>
  )
}
