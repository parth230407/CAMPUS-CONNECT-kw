import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Coins, TrendingUp, Clock, Wallet } from "lucide-react"
import type { TokenBalance } from "@/lib/rewards"

interface TokenBalanceCardProps {
  balance: TokenBalance
  className?: string
}

export function TokenBalanceCard({ balance, className }: TokenBalanceCardProps) {
  return (
    <Card className={`border-border/50 bg-gradient-to-br from-accent/5 to-primary/5 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Coins className="w-5 h-5 text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg">Campus Tokens</CardTitle>
              <CardDescription>Your reward balance</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-accent/10 text-accent">
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground mb-1">{balance.total}</div>
          <div className="text-sm text-muted-foreground">Total Tokens Earned</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-card/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-lg font-semibold text-primary">{balance.available}</span>
            </div>
            <div className="text-xs text-muted-foreground">Available</div>
          </div>
          <div className="text-center p-3 bg-card/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-secondary" />
              <span className="text-lg font-semibold text-secondary">{balance.pending}</span>
            </div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Next milestone</span>
            <span className="font-medium">200 tokens</span>
          </div>
          <Progress value={(balance.total / 200) * 100} className="h-2" />
          <div className="text-xs text-muted-foreground text-center">
            {200 - balance.total} tokens until next reward tier
          </div>
        </div>

        <Button className="w-full bg-transparent" variant="outline">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Earning History
        </Button>
      </CardContent>
    </Card>
  )
}
