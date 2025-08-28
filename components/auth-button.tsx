"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import { authenticate, signOut, getStacksAddress } from "@/lib/auth"
import { User, LogOut, Settings, Wallet } from "lucide-react"

export function AuthButton() {
  const { user, isAuthenticated, isLoading } = useAuth()

  const handleAuthenticate = () => {
    try {
      console.log("[v0] Starting authentication")
      const button = document.querySelector("[data-auth-button]") as HTMLButtonElement
      if (button) {
        button.textContent = "Connecting..."
        button.disabled = true
      }

      authenticate()

      setTimeout(() => {
        if (button) {
          button.textContent = "Connect Stacks ID"
          button.disabled = false
        }
      }, 2000)
    } catch (error) {
      console.error("[v0] Authentication button error:", error)
    }
  }

  if (isLoading) {
    return <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
  }

  if (!isAuthenticated) {
    return (
      <Button onClick={handleAuthenticate} size="sm" className="bg-primary hover:bg-primary/90" data-auth-button>
        <Wallet className="w-4 h-4 mr-2" />
        Connect Stacks ID
      </Button>
    )
  }

  const stacksAddress = getStacksAddress()
  const displayName = user?.profile?.name || user?.username || "Anonymous"
  const shortAddress = stacksAddress ? `${stacksAddress.slice(0, 6)}...${stacksAddress.slice(-4)}` : ""

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-primary">{displayName.charAt(0).toUpperCase()}</span>
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium">{displayName}</div>
            <div className="text-xs text-muted-foreground">{shortAddress}</div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{displayName}</p>
          <p className="text-xs text-muted-foreground font-mono">{shortAddress}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="w-4 h-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="text-destructive">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
