"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/components/auth-provider"
import { getStacksAddress, getCurrentUserProfile } from "@/lib/auth"
import { Edit, Save, Plus, X, GraduationCap } from "lucide-react"

const INTEREST_OPTIONS = [
  "Programming",
  "Web Development",
  "AI/ML",
  "Data Science",
  "Cybersecurity",
  "Photography",
  "Design",
  "Art",
  "Music",
  "Gaming",
  "Sports",
  "Fitness",
  "Basketball",
  "Soccer",
  "Tennis",
  "Reading",
  "Writing",
  "Literature",
  "History",
  "Philosophy",
  "Travel",
  "Cooking",
  "Movies",
  "Anime",
  "Podcasts",
  "Entrepreneurship",
  "Startups",
  "Finance",
  "Marketing",
  "Business",
  "Robotics",
  "3D Printing",
  "Electronics",
  "Engineering",
  "Mathematics",
  "Psychology",
  "Sociology",
  "Politics",
  "Environment",
  "Volunteering",
]

function ProfileContent() {
  const { user } = useAuth()
  const userProfile = getCurrentUserProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const [profile, setProfile] = useState({
    nickname: user?.profile?.nickname || user?.username || "CoolStudent",
    university: userProfile?.university || "SRM University KTR Chennai",
    major: userProfile?.major || "Computer Science",
    year: userProfile?.year || "Junior",
    bio: "Passionate about web development and AI. Always looking for study partners and project collaborators!",
    interests: userProfile?.interests || ["React", "Web3", "Gaming", "AI"],
  })

  const [newInterest, setNewInterest] = useState("")
  const stacksAddress = getStacksAddress()

  const addInterest = (interest: string) => {
    if (interest && !profile.interests.includes(interest)) {
      setProfile((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }))
      setNewInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsEditing(false)
      setLastSaved(new Date())
      console.log("[v0] Profile saved successfully:", profile)

      const event = new CustomEvent("profileSaved", { detail: profile })
      window.dispatchEvent(event)
    } catch (error) {
      console.error("[v0] Failed to save profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {lastSaved && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
            Profile saved successfully at {lastSaved.toLocaleTimeString()}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-border/50">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">{profile.nickname.slice(0, 2).toUpperCase()}</span>
                </div>
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Nickname</Label>
                      <Input
                        value={profile.nickname}
                        onChange={(e) => setProfile((prev) => ({ ...prev, nickname: e.target.value }))}
                        placeholder="Enter your favorite nickname"
                        className="text-center font-semibold"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">University</Label>
                      <Input
                        value={profile.university}
                        onChange={(e) => setProfile((prev) => ({ ...prev, university: e.target.value }))}
                        placeholder="SRM University KTR Chennai"
                        className="text-center"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Major</Label>
                      <Input
                        value={profile.major}
                        onChange={(e) => setProfile((prev) => ({ ...prev, major: e.target.value }))}
                        placeholder="Your major/field of study"
                        className="text-center"
                      />
                    </div>
                    <Select
                      value={profile.year}
                      onValueChange={(value) => setProfile((prev) => ({ ...prev, year: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Freshman">Freshman</SelectItem>
                        <SelectItem value="Sophomore">Sophomore</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <>
                    <CardTitle className="text-xl">{profile.nickname}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center justify-center gap-1 text-sm">
                        <GraduationCap className="w-4 h-4" />
                        {profile.university}
                      </div>
                      <div>
                        {profile.major} • {profile.year}
                      </div>
                    </CardDescription>
                  </>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Stacks ID</Label>
                  <p className="text-xs font-mono bg-muted p-2 rounded mt-1 break-all">
                    {stacksAddress || "Not connected"}
                  </p>
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} size="sm" className="flex-1" disabled={isSaving}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Saving..." : "Save"}
                      </Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline" size="sm" disabled={isSaving}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell others about yourself..."
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                )}
              </CardContent>
            </Card>

            {/* Interests Section */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">My Interests</CardTitle>
                <CardDescription>Share your hobbies and interests to connect with like-minded students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {interest}
                      {isEditing && (
                        <button onClick={() => removeInterest(interest)} className="ml-2 hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>

                {isEditing && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Select value={newInterest} onValueChange={setNewInterest}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select an interest" />
                        </SelectTrigger>
                        <SelectContent>
                          {INTEREST_OPTIONS.filter((option) => !profile.interests.includes(option)).map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={() => addInterest(newInterest)} size="sm" disabled={!newInterest}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Add interests to help other students find you based on shared hobbies and passions
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activity Stats */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Campus Connect Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">24</div>
                    <div className="text-sm text-muted-foreground">Connections</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">156</div>
                    <div className="text-sm text-muted-foreground">Tokens Earned</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">8</div>
                    <div className="text-sm text-muted-foreground">Study Groups</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}
