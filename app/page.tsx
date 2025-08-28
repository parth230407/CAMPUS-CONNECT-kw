import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Users, Heart, Zap, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Powered by Stacks Blockchain
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Find Your Campus <span className="text-primary">Community</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Connect with fellow students who share your interests. Build meaningful relationships and earn rewards for
            being an active community member.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/discover">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Users className="w-5 h-5 mr-2" />
                Start Connecting
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Why Choose Campus Connect?</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built for students, by students. Connect safely and earn rewards for building community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Interest-Based Matching</CardTitle>
                <CardDescription>
                  Find students who share your hobbies, academic interests, and passions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Earn Rewards</CardTitle>
                <CardDescription>
                  Get tokens for participating in activities and helping build the community
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>
                  Use your Stacks ID for secure authentication without sharing personal data
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Student Profiles */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Meet Your Future Study Buddies</h3>
            <p className="text-muted-foreground text-lg">See how students are connecting through shared interests</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Chen",
                major: "Computer Science",
                interests: ["React", "Web3", "Gaming", "AI"],
                year: "Junior",
              },
              {
                name: "Sarah Johnson",
                major: "Digital Marketing",
                interests: ["Photography", "Design", "Startups", "Travel"],
                year: "Sophomore",
              },
              {
                name: "Mike Rodriguez",
                major: "Engineering",
                interests: ["Robotics", "3D Printing", "Music", "Sports"],
                year: "Senior",
              },
            ].map((student, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <CardTitle className="text-center">{student.name}</CardTitle>
                  <CardDescription className="text-center">
                    {student.major} • {student.year}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {student.interests.map((interest, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline" size="sm">
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">Ready to Find Your Campus Community?</h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students already connecting through Campus Connect. Start building meaningful
            relationships today.
          </p>
          <Link href="/profile">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Users className="w-5 h-5 mr-2" />
              Connect with Stacks ID
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Users className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Campus Connect</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built for the Stacks Hackathon • Connecting students worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
