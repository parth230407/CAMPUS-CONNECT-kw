export interface RewardActivity {
  id: string
  type: "connection" | "group_join" | "profile_complete" | "daily_login" | "message_sent" | "event_attend"
  title: string
  description: string
  tokens: number
  timestamp: Date
  completed: boolean
}

export interface TokenBalance {
  total: number
  available: number
  pending: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  tokens: number
  unlocked: boolean
  progress: number
  maxProgress: number
}

// Mock token balance - in real app this would come from blockchain
export const getTokenBalance = (): TokenBalance => {
  return {
    total: 156,
    available: 134,
    pending: 22,
  }
}

// Mock recent activities - in real app this would come from user's activity log
export const getRecentActivities = (): RewardActivity[] => {
  return [
    {
      id: "1",
      type: "connection",
      title: "New Connection",
      description: "Connected with Sarah Johnson",
      tokens: 10,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      completed: true,
    },
    {
      id: "2",
      type: "group_join",
      title: "Joined Study Group",
      description: 'Joined "React Developers Circle"',
      tokens: 15,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      completed: true,
    },
    {
      id: "3",
      type: "daily_login",
      title: "Daily Login",
      description: "Logged in for 3 consecutive days",
      tokens: 5,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      completed: true,
    },
    {
      id: "4",
      type: "profile_complete",
      title: "Profile Completed",
      description: "Added bio and interests to profile",
      tokens: 20,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      completed: true,
    },
  ]
}

// Mock achievements system
export const getAchievements = (): Achievement[] => {
  return [
    {
      id: "1",
      title: "Social Butterfly",
      description: "Make 10 connections",
      icon: "🦋",
      tokens: 50,
      unlocked: false,
      progress: 7,
      maxProgress: 10,
    },
    {
      id: "2",
      title: "Group Leader",
      description: "Join 5 study groups",
      icon: "👑",
      tokens: 75,
      unlocked: false,
      progress: 3,
      maxProgress: 5,
    },
    {
      id: "3",
      title: "Early Adopter",
      description: "Complete your profile",
      icon: "⭐",
      tokens: 25,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
    },
    {
      id: "4",
      title: "Consistent User",
      description: "Login for 7 consecutive days",
      icon: "🔥",
      tokens: 40,
      unlocked: false,
      progress: 3,
      maxProgress: 7,
    },
  ]
}

// Available activities to earn tokens
export const getAvailableActivities = (): RewardActivity[] => {
  return [
    {
      id: "daily-1",
      type: "daily_login",
      title: "Daily Check-in",
      description: "Login to Campus Connect today",
      tokens: 5,
      timestamp: new Date(),
      completed: false,
    },
    {
      id: "connect-1",
      type: "connection",
      title: "Make a Connection",
      description: "Connect with a fellow student",
      tokens: 10,
      timestamp: new Date(),
      completed: false,
    },
    {
      id: "group-1",
      type: "group_join",
      title: "Join a Study Group",
      description: "Find and join an interest-based group",
      tokens: 15,
      timestamp: new Date(),
      completed: false,
    },
    {
      id: "message-1",
      type: "message_sent",
      title: "Send a Message",
      description: "Start a conversation with someone new",
      tokens: 8,
      timestamp: new Date(),
      completed: false,
    },
  ]
}

export const formatTimeAgo = (date: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  return `${Math.floor(diffInSeconds / 86400)}d ago`
}
