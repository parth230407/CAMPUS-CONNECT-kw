"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StudentProfileCard } from "@/components/student-profile-card"
import { Navigation } from "@/components/navigation"
import { Users, Search, Filter, Sparkles, TrendingUp } from "lucide-react"

const CURRENT_USER = {
  interests: ["React", "Web3", "Gaming", "AI"],
  major: "Computer Science",
  year: "Junior",
}

const SAMPLE_STUDENTS = [
  {
    id: "1",
    name: "Sarah Johnson",
    major: "Digital Marketing",
    year: "Sophomore",
    bio: "Love creating content and building brands. Always up for photography walks around campus!",
    interests: ["Photography", "Design", "Startups", "Travel", "Social Media"],
    stacksId: "SP1ABC123...",
    connections: 18,
    tokensEarned: 89,
  },
  {
    id: "2",
    name: "Mike Rodriguez",
    major: "Mechanical Engineering",
    year: "Senior",
    bio: "Building robots and 3D printing cool stuff. Looking for project partners and music jam sessions.",
    interests: ["Robotics", "3D Printing", "Music", "Sports", "Engineering"],
    stacksId: "SP2DEF456...",
    connections: 31,
    tokensEarned: 203,
  },
  {
    id: "3",
    name: "Emma Chen",
    major: "Psychology",
    year: "Junior",
    bio: "Fascinated by human behavior and mental health. Love reading, hiking, and deep conversations.",
    interests: ["Psychology", "Reading", "Hiking", "Mental Health", "Research"],
    stacksId: "SP3GHI789...",
    connections: 22,
    tokensEarned: 134,
  },
  {
    id: "4",
    name: "David Kim",
    major: "Computer Science",
    year: "Freshman",
    bio: "New to campus and excited to learn! Passionate about AI and always looking for study groups.",
    interests: ["AI", "Programming", "Gaming", "Math", "Study Groups"],
    stacksId: "SP4JKL012...",
    connections: 7,
    tokensEarned: 45,
  },
  {
    id: "5",
    name: "Lisa Wang",
    major: "Business Administration",
    year: "Senior",
    bio: "Entrepreneur at heart with two startups under my belt. Love networking and helping others succeed.",
    interests: ["Entrepreneurship", "Business", "Networking", "Finance", "Mentoring"],
    stacksId: "SP5MNO345...",
    connections: 67,
    tokensEarned: 412,
  },
  {
    id: "6",
    name: "James Wilson",
    major: "Art History",
    year: "Graduate",
    bio: "Art lover and museum enthusiast. Always organizing gallery visits and cultural events on campus.",
    interests: ["Art", "History", "Museums", "Culture", "Events"],
    stacksId: "SP6PQR678...",
    connections: 29,
    tokensEarned: 178,
  },
  {
    id: "7",
    name: "Alex Thompson",
    major: "Computer Science",
    year: "Senior",
    bio: "Full-stack developer passionate about React and Web3. Building the next generation of decentralized apps!",
    interests: ["React", "Web3", "JavaScript", "Blockchain", "DeFi"],
    stacksId: "SP7STU901...",
    connections: 45,
    tokensEarned: 289,
  },
  {
    id: "8",
    name: "Maya Patel",
    major: "Data Science",
    year: "Junior",
    bio: "AI researcher and gaming enthusiast. Love exploring machine learning applications in game development.",
    interests: ["AI", "Machine Learning", "Gaming", "Python", "Data Analysis"],
    stacksId: "SP8VWX234...",
    connections: 33,
    tokensEarned: 198,
  },
  {
    id: "9",
    name: "Jordan Lee",
    major: "Game Design",
    year: "Sophomore",
    bio: "Indie game developer creating immersive experiences. Always looking for fellow gamers and developers!",
    interests: ["Gaming", "Game Development", "Unity", "Art", "Storytelling"],
    stacksId: "SP9YZA567...",
    connections: 28,
    tokensEarned: 156,
  },
]

const INTEREST_FILTERS = [
  "Programming",
  "AI",
  "Design",
  "Photography",
  "Music",
  "Sports",
  "Art",
  "Business",
  "Engineering",
  "Psychology",
  "React",
  "Web3",
  "Gaming",
  "Blockchain",
  "Machine Learning",
]

const calculateMatchScore = (
  userInterests: string[],
  studentInterests: string[],
  userMajor: string,
  studentMajor: string,
) => {
  const sharedInterests = userInterests.filter((interest) =>
    studentInterests.some(
      (studentInterest) =>
        studentInterest.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes(studentInterest.toLowerCase()),
    ),
  )

  const interestScore = (sharedInterests.length / Math.max(userInterests.length, studentInterests.length)) * 100
  const majorBonus = userMajor === studentMajor ? 20 : 0

  return Math.min(Math.round(interestScore + majorBonus), 100)
}

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInterest, setSelectedInterest] = useState("All Interests")
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [filteredStudents, setFilteredStudents] = useState(SAMPLE_STUDENTS)
  const [sortBy, setSortBy] = useState("compatibility") // Added sorting option
  const [recommendedStudents, setRecommendedStudents] = useState<typeof SAMPLE_STUDENTS>([])
  const [isSearching, setIsSearching] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<Record<string, "idle" | "connecting" | "connected">>({})

  useEffect(() => {
    const studentsWithScores = SAMPLE_STUDENTS.map((student) => ({
      ...student,
      matchScore: calculateMatchScore(CURRENT_USER.interests, student.interests, CURRENT_USER.major, student.major),
    }))

    const topMatches = studentsWithScores
      .filter((student) => student.matchScore > 30)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3)

    setRecommendedStudents(topMatches)
  }, [])

  const handleSearch = async () => {
    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filtered = SAMPLE_STUDENTS

    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.interests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedInterest !== "All Interests") {
      filtered = filtered.filter((student) => student.interests.includes(selectedInterest))
    }

    if (selectedYear !== "All Years") {
      filtered = filtered.filter((student) => student.year === selectedYear)
    }

    if (sortBy === "compatibility") {
      filtered = filtered
        .map((student) => ({
          ...student,
          matchScore: calculateMatchScore(CURRENT_USER.interests, student.interests, CURRENT_USER.major, student.major),
        }))
        .sort((a, b) => b.matchScore - a.matchScore)
    } else if (sortBy === "tokens") {
      filtered = filtered.sort((a, b) => b.tokensEarned - a.tokensEarned)
    } else if (sortBy === "connections") {
      filtered = filtered.sort((a, b) => b.connections - a.connections)
    }

    setFilteredStudents(filtered)
    setIsSearching(false)
  }

  useEffect(() => {
    handleSearch()
  }, [sortBy])

  const handleConnect = (studentId: string) => {
    setConnectionStatus((prev) => ({ ...prev, [studentId]: "connecting" }))
    console.log("[v0] Connecting with student:", studentId)

    setTimeout(() => {
      setConnectionStatus((prev) => ({ ...prev, [studentId]: "connected" }))
      console.log("[v0] Successfully connected with student:", studentId)
    }, 1500)
  }

  const handleMessage = (studentId: string) => {
    console.log("[v0] Opening message with student:", studentId)
    alert(`Opening message with student ${studentId}. In a real app, this would open a chat interface.`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {recommendedStudents.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">Recommended for You</h2>
            </div>
            <p className="text-muted-foreground mb-6">Students with interests similar to yours</p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {recommendedStudents.map((student) => (
                <div key={student.id} className="relative">
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge className="bg-accent text-accent-foreground">{student.matchScore}% match</Badge>
                  </div>
                  <StudentProfileCard student={student} onConnect={handleConnect} onMessage={handleMessage} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <Card className="border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <CardTitle>Your Interest Profile</CardTitle>
              </div>
              <CardDescription>Based on your interests: {CURRENT_USER.interests.join(", ")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {
                      SAMPLE_STUDENTS.filter((s) =>
                        s.interests.some((interest) => CURRENT_USER.interests.includes(interest)),
                      ).length
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">Students with shared interests</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">{CURRENT_USER.interests.length}</div>
                  <div className="text-sm text-muted-foreground">Your active interests</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">
                    {Math.round(
                      recommendedStudents.reduce((acc, s) => acc + s.matchScore, 0) / recommendedStudents.length,
                    ) || 0}
                    %
                  </div>
                  <div className="text-sm text-muted-foreground">Average compatibility</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">Discover Students</h2>

          <div className="bg-card/50 p-6 rounded-lg border border-border/50 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, major, or interests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="md:w-auto" disabled={isSearching}>
                <Search className="w-4 h-4 mr-2" />
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Select value={selectedInterest} onValueChange={setSelectedInterest}>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Filter by interest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Interests">All Interests</SelectItem>
                  {INTEREST_FILTERS.map((interest) => (
                    <SelectItem key={interest} value={interest}>
                      {interest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Filter by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Years">All Years</SelectItem>
                  <SelectItem value="Freshman">Freshman</SelectItem>
                  <SelectItem value="Sophomore">Sophomore</SelectItem>
                  <SelectItem value="Junior">Junior</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="Graduate">Graduate</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compatibility">Best Match</SelectItem>
                  <SelectItem value="tokens">Most Tokens</SelectItem>
                  <SelectItem value="connections">Most Connected</SelectItem>
                </SelectContent>
              </Select>

              {(selectedInterest !== "All Interests" || selectedYear !== "All Years" || searchTerm) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedInterest("All Interests")
                    setSelectedYear("All Years")
                    setFilteredStudents(SAMPLE_STUDENTS)
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {(selectedInterest !== "All Interests" || selectedYear !== "All Years") && (
              <div className="flex flex-wrap gap-2">
                {selectedInterest !== "All Interests" && (
                  <Badge variant="secondary">Interest: {selectedInterest}</Badge>
                )}
                {selectedYear !== "All Years" && <Badge variant="secondary">Year: {selectedYear}</Badge>}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">
              {isSearching ? "Searching..." : `${filteredStudents.length} Students Found`}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              {sortBy === "compatibility"
                ? "Sorted by compatibility"
                : sortBy === "tokens"
                  ? "Sorted by tokens earned"
                  : "Sorted by connections"}
            </div>
          </div>

          {isSearching ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="border-border/50">
                  <CardHeader>
                    <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse mx-auto w-24" />
                    <div className="h-3 bg-muted rounded animate-pulse mx-auto w-32" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded animate-pulse" />
                      <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => {
                const matchScore = calculateMatchScore(
                  CURRENT_USER.interests,
                  student.interests,
                  CURRENT_USER.major,
                  student.major,
                )
                return (
                  <div key={student.id} className="relative">
                    {sortBy === "compatibility" && matchScore > 50 && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {matchScore}% match
                        </Badge>
                      </div>
                    )}
                    <StudentProfileCard student={student} onConnect={handleConnect} onMessage={handleMessage} />
                  </div>
                )
              })}
            </div>
          )}

          {filteredStudents.length === 0 && !isSearching && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No students found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters to find more students.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
