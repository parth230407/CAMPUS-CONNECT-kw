export interface StacksUser {
  username?: string
  profile?: {
    nickname?: string
    image?: Array<{ "@type": string; contentUrl?: string }>
  }
  identityAddress?: string
  appPrivateKey?: string
}

// Mock user data for demo purposes
const mockUsers = [
  {
    username: "alice_cs",
    profile: { nickname: "TechAlice" },
    identityAddress: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
    interests: ["Computer Science", "AI/ML", "Web Development"],
    major: "Computer Science",
    year: "Junior",
    university: "SRM University KTR Chennai",
  },
  {
    username: "bob_design",
    profile: { nickname: "DesignBob" },
    identityAddress: "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE",
    interests: ["UI/UX Design", "Digital Art", "Photography"],
    major: "Design",
    year: "Senior",
    university: "SRM University KTR Chennai",
  },
  {
    username: "carol_bio",
    profile: { nickname: "BioCarol" },
    identityAddress: "SP1A1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T",
    interests: ["Biology", "Research", "Environmental Science"],
    major: "Biology",
    year: "Sophomore",
    university: "SRM University KTR Chennai",
  },
]

let currentUserIndex = 0

export const authenticate = async () => {
  console.log("[v0] Starting mock authentication for hackathon demo")

  // Simulate authentication delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Cycle through mock users for demo
  const selectedUser = mockUsers[currentUserIndex % mockUsers.length]
  currentUserIndex++

  localStorage.setItem("mockStacksAuth", JSON.stringify(selectedUser))
  window.dispatchEvent(new CustomEvent("stacksAuthComplete"))

  console.log("[v0] Mock authentication completed for:", selectedUser.username)
}

export const signOut = () => {
  localStorage.removeItem("mockStacksAuth")
  window.dispatchEvent(new CustomEvent("stacksAuthComplete"))
  console.log("[v0] User signed out")
}

export const isSignedIn = (): boolean => {
  return localStorage.getItem("mockStacksAuth") !== null
}

export const getUserData = (): StacksUser | null => {
  const mockData = localStorage.getItem("mockStacksAuth")
  if (mockData) {
    return JSON.parse(mockData)
  }
  return null
}

export const getStacksAddress = (): string | null => {
  const userData = getUserData()
  return userData?.identityAddress || null
}

export const handlePendingSignIn = async () => {
  // No pending sign-in needed for mock auth
  return null
}

// Additional helper for demo
export const getCurrentUserProfile = () => {
  const userData = getUserData()
  if (userData) {
    const mockData = JSON.parse(localStorage.getItem("mockStacksAuth") || "{}")
    return {
      ...userData,
      interests: mockData.interests || [],
      major: mockData.major || "Undeclared",
      year: mockData.year || "Freshman",
      university: mockData.university || "SRM University KTR Chennai",
    }
  }
  return null
}
