"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InterestMatchingCard } from "@/components/interest-matching-card"
import { Navigation } from "@/components/navigation"
import { Users, Search, Plus, Sparkles } from "lucide-react"

const CURRENT_USER_INTERESTS = ["React", "Web3", "Gaming", "AI"]

const INTEREST_GROUPS = [
  {
    id: "1",
    name: "Web3 Developers",
    description:
      "Building the future of decentralized applications. Weekly coding sessions and project collaborations.",
    interests: ["Web3", "Blockchain", "React", "JavaScript", "DeFi"],
    memberCount: 24,
    matchScore: 85,
    isJoined: false,
  },
  {
    id: "2",
    name: "AI Study Group",
    description: "Exploring machine learning, neural networks, and AI applications. Perfect for beginners and experts.",
    interests: ["AI", "Machine Learning", "Python", "Data Science", "Research"],
    memberCount: 31,
    matchScore: 78,
    isJoined: true,
  },
  {
    id: "3",
    name: "Campus Gamers",
    description: "From indie games to AAA titles, we love it all! Regular gaming nights and tournaments.",
    interests: ["Gaming", "Esports", "Game Development", "Streaming", "Community"],
    memberCount: 67,
    matchScore: 72,
    isJoined: false,
  },
  {
    id: "4",
    name: "React Developers Circle",
    description: "Frontend developers passionate about React ecosystem. Share projects, tips, and best practices.",
    interests: ["React", "JavaScript", "Frontend", "Web Development", "UI/UX"],
    memberCount: 45,
    matchScore: 90,
    isJoined: true,
  },
  {
    id: "5",
    name: "Startup Founders",
    description: "Aspiring entrepreneurs building the next big thing. Networking, mentorship, and pitch practice.",
    interests: ["Entrepreneurship", "Business", "Startups", "Networking", "Innovation"],
    memberCount: 28,
    matchScore: 35,
    isJoined: false,
  },
  {
    id: "6",
    name: "Photography Club",
    description: "Capturing campus life and beyond. Weekly photo walks and editing workshops.",
    interests: ["Photography", "Art", "Visual Design", "Editing", "Creativity"],
    memberCount: 52,
    matchScore: 25,
    isJoined: false,
  },
]

export default function GroupsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredGroups, setFilteredGroups] = useState(INTEREST_GROUPS)
  const [isSearching, setIsSearching] = useState(false)
  const [groupStates, setGroupStates] = useState<Record<string, { isJoined: boolean }>>({})

  const handleSearch = async () => {
    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!searchTerm) {
      setFilteredGroups(INTEREST_GROUPS)
      setIsSearching(false)
      return
    }

    const filtered = INTEREST_GROUPS.filter(
      (group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.interests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredGroups(filtered)
    setIsSearching(false)
  }

  const handleJoinGroup = (groupId: string) => {
    setGroupStates((prev) => ({ ...prev, [groupId]: { isJoined: true } }))
    console.log("[v0] Successfully joined group:", groupId)

    const groupName = INTEREST_GROUPS.find((g) => g.id === groupId)?.name
    alert(`Successfully joined ${groupName}! You'll now receive updates and can participate in group activities.`)
  }

  const handleLeaveGroup = (groupId: string) => {
    setGroupStates((prev) => ({ ...prev, [groupId]: { isJoined: false } }))
    console.log("[v0] Successfully left group:", groupId)

    const groupName = INTEREST_GROUPS.find((g) => g.id === groupId)?.name
    alert(`You have left ${groupName}. You can rejoin anytime!`)
  }

  const handleViewMembers = (groupId: string) => {
    console.log("[v0] Viewing members of group:", groupId)
    const groupName = INTEREST_GROUPS.find((g) => g.id === groupId)?.name
    alert(
      `Viewing members of ${groupName}. In a real app, this would show the member list and allow you to connect with them.`,
    )
  }

  const handleCreateGroup = () => {
    console.log("[v0] Creating new group")
    alert("Create Group feature coming soon! You'll be able to start your own interest-based study groups.")
  }

  const getGroupWithState = (group: (typeof INTEREST_GROUPS)[0]) => ({
    ...group,
    isJoined: groupStates[group.id]?.isJoined ?? group.isJoined,
  })

  const recommendedGroups = INTEREST_GROUPS.filter((group) => group.matchScore > 60)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3)
    .map(getGroupWithState)

  const myGroups = INTEREST_GROUPS.filter((group) => getGroupWithState(group).isJoined).map(getGroupWithState)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* My Groups */}
        {myGroups.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">My Groups</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myGroups.map((group) => (
                <InterestMatchingCard
                  key={group.id}
                  group={group}
                  onJoin={handleJoinGroup}
                  onLeave={handleLeaveGroup}
                  onViewMembers={handleViewMembers}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recommended Groups */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-accent" />
            <h2 className="text-2xl font-bold text-foreground">Recommended Groups</h2>
          </div>
          <p className="text-muted-foreground mb-6">Based on your interests: {CURRENT_USER_INTERESTS.join(", ")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedGroups.map((group) => (
              <InterestMatchingCard
                key={group.id}
                group={group}
                onJoin={handleJoinGroup}
                onLeave={handleLeaveGroup}
                onViewMembers={handleViewMembers}
              />
            ))}
          </div>
        </div>

        {/* Search and All Groups */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">All Interest Groups</h2>
            <Button onClick={handleCreateGroup}>
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>

          <div className="flex gap-4">
            <Input
              placeholder="Search groups by name or interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              <Search className="w-4 h-4 mr-2" />
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>

          {isSearching ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border border-border/50 rounded-lg p-6 animate-pulse">
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-3 bg-muted rounded mb-4 w-3/4" />
                  <div className="h-2 bg-muted rounded mb-4" />
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-muted rounded w-16" />
                    <div className="h-6 bg-muted rounded w-20" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-muted rounded flex-1" />
                    <div className="h-8 bg-muted rounded flex-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <InterestMatchingCard
                  key={group.id}
                  group={getGroupWithState(group)}
                  onJoin={handleJoinGroup}
                  onLeave={handleLeaveGroup}
                  onViewMembers={handleViewMembers}
                />
              ))}
            </div>
          )}

          {filteredGroups.length === 0 && !isSearching && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No groups found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or create a new group for your interests.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
