import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, MessageCircle, Calendar, CheckCircle, Coins } from "lucide-react"
import { type RewardActivity, formatTimeAgo } from "@/lib/rewards"

interface ActivityFeedProps {
  activities: RewardActivity[]
  title?: string
  showActions?: boolean
}

const getActivityIcon = (type: RewardActivity["type"]) => {
  switch (type) {
    case "connection":
      return <UserPlus className="w-4 h-4" />
    case "group_join":
      return <Users className="w-4 h-4" />
    case "message_sent":
      return <MessageCircle className="w-4 h-4" />
    case "event_attend":
      return <Calendar className="w-4 h-4" />
    case "profile_complete":
      return <CheckCircle className="w-4 h-4" />
    case "daily_login":
      return <CheckCircle className="w-4 h-4" />
    default:
      return <Coins className="w-4 h-4" />
  }
}

const getActivityColor = (type: RewardActivity["type"]) => {
  switch (type) {
    case "connection":
      return "text-primary"
    case "group_join":
      return "text-accent"
    case "message_sent":
      return "text-secondary"
    case "event_attend":
      return "text-primary"
    case "profile_complete":
      return "text-accent"
    case "daily_login":
      return "text-secondary"
    default:
      return "text-muted-foreground"
  }
}

export function ActivityFeed({ activities, title = "Recent Activity", showActions = false }: ActivityFeedProps) {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>
          {showActions ? "Complete activities to earn tokens" : "Your recent token-earning activities"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Coins className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No activities yet</p>
              <p className="text-sm">Start connecting to earn your first tokens!</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity.type)}`}
                >
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        +{activity.tokens}
                      </Badge>
                      {!showActions && (
                        <span className="text-xs text-muted-foreground">{formatTimeAgo(activity.timestamp)}</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                  {showActions && !activity.completed && (
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      Complete Activity
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
