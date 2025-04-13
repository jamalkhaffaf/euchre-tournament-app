import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, BarChart, Play } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Euchre Tournament Scorekeeper</h1>
        <Button asChild>
          <Link href="/tournaments/new">New Tournament</Link>
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-blue-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Players</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700">24</div>
                <p className="text-xs text-blue-600">+2 from last tournament</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tournaments</CardTitle>
                <Trophy className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700">7</div>
                <p className="text-xs text-green-600">Last: April 5, 2025</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Games Played</CardTitle>
                <Play className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-700">42</div>
                <p className="text-xs text-yellow-600">Across all tournaments</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Score</CardTitle>
                <BarChart className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-700">156</div>
                <p className="text-xs text-purple-600">By Sarah Johnson</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Tournaments</CardTitle>
                <CardDescription>Your last 3 tournaments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Spring Euchre Classic", date: "April 5, 2025", players: 16, winner: "Sarah Johnson" },
                    { name: "Friday Night Euchre", date: "March 22, 2025", players: 12, winner: "Mike Thompson" },
                    { name: "Winter Tournament", date: "February 15, 2025", players: 20, winner: "David Wilson" },
                  ].map((tournament, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{tournament.name}</p>
                        <p className="text-sm text-muted-foreground">{tournament.date}</p>
                      </div>
                      <div className="text-sm text-right">
                        <p className="font-medium">{tournament.players} players</p>
                        <p className="text-muted-foreground">Winner: {tournament.winner}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Players</CardTitle>
                <CardDescription>Based on all-time scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Sarah Johnson", score: 156, games: 12 },
                    { name: "Mike Thompson", score: 142, games: 15 },
                    { name: "David Wilson", score: 138, games: 14 },
                    { name: "Emily Davis", score: 129, games: 10 },
                    { name: "Alex Rodriguez", score: 124, games: 11 },
                  ].map((player, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="font-medium w-5 text-center">{i + 1}</div>
                        <div>{player.name}</div>
                      </div>
                      <div className="text-sm text-right">
                        <p className="font-medium">{player.score} pts</p>
                        <p className="text-muted-foreground">{player.games} games</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="players" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Player Management</CardTitle>
                  <CardDescription>Add, edit, and manage players for your tournaments</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/players/import">Import Players</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/players/new">Add Player</Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Player list will be displayed here. Navigate to the Players page for full management.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Tournament History</CardTitle>
                  <CardDescription>View past tournaments and create new ones</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/tournaments/new">New Tournament</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Tournament history will be displayed here. Navigate to the Tournaments page for full details.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistics & Leaderboards</CardTitle>
              <CardDescription>View performance trends and player rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Detailed statistics will be displayed here. Navigate to the Stats page for full analytics.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
