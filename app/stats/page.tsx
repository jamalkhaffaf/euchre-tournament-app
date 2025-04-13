"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, BarChart3, Calendar, Download, Home, Search, Trophy, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for player stats
const mockPlayerStats = [
  { id: 1, name: "Sarah Johnson", totalScore: 876, highestScore: 156, gamesPlayed: 12, avgScore: 73.0, winRate: 0.33 },
  { id: 2, name: "Mike Thompson", totalScore: 754, highestScore: 142, gamesPlayed: 15, avgScore: 50.3, winRate: 0.2 },
  { id: 3, name: "David Wilson", totalScore: 692, highestScore: 138, gamesPlayed: 14, avgScore: 49.4, winRate: 0.14 },
  { id: 4, name: "Emily Davis", totalScore: 587, highestScore: 129, gamesPlayed: 10, avgScore: 58.7, winRate: 0.1 },
  { id: 5, name: "Alex Rodriguez", totalScore: 621, highestScore: 124, gamesPlayed: 11, avgScore: 56.5, winRate: 0.09 },
  { id: 6, name: "Jessica Brown", totalScore: 542, highestScore: 132, gamesPlayed: 9, avgScore: 60.2, winRate: 0.11 },
  { id: 7, name: "Ryan Martinez", totalScore: 498, highestScore: 128, gamesPlayed: 8, avgScore: 62.3, winRate: 0.0 },
  { id: 8, name: "Sophia Lee", totalScore: 476, highestScore: 120, gamesPlayed: 7, avgScore: 68.0, winRate: 0.0 },
  { id: 9, name: "Daniel Taylor", totalScore: 432, highestScore: 115, gamesPlayed: 6, avgScore: 72.0, winRate: 0.0 },
  { id: 10, name: "Olivia White", totalScore: 398, highestScore: 110, gamesPlayed: 5, avgScore: 79.6, winRate: 0.0 },
  { id: 11, name: "William Johnson", totalScore: 352, highestScore: 105, gamesPlayed: 7, avgScore: 50.3, winRate: 0.0 },
  { id: 12, name: "Emma Smith", totalScore: 324, highestScore: 98, gamesPlayed: 6, avgScore: 54.0, winRate: 0.0 },
  { id: 13, name: "James Brown", totalScore: 287, highestScore: 95, gamesPlayed: 5, avgScore: 57.4, winRate: 0.0 },
  { id: 14, name: "Ava Miller", totalScore: 265, highestScore: 92, gamesPlayed: 4, avgScore: 66.3, winRate: 0.0 },
  { id: 15, name: "Benjamin Davis", totalScore: 243, highestScore: 88, gamesPlayed: 4, avgScore: 60.8, winRate: 0.0 },
  { id: 16, name: "Mia Wilson", totalScore: 218, highestScore: 85, gamesPlayed: 4, avgScore: 54.5, winRate: 0.0 },
]

// Mock data for tournament stats
const mockTournamentStats = [
  {
    id: 1,
    name: "Spring Euchre Classic",
    date: "April 5, 2025",
    players: 16,
    tables: 4,
    rounds: 4,
    winner: "Sarah Johnson",
    avgScore: 68.5,
  },
  {
    id: 2,
    name: "Friday Night Euchre",
    date: "March 22, 2025",
    players: 12,
    tables: 3,
    rounds: 4,
    winner: "Mike Thompson",
    avgScore: 62.3,
  },
  {
    id: 3,
    name: "Winter Tournament",
    date: "February 15, 2025",
    players: 20,
    tables: 5,
    rounds: 4,
    winner: "David Wilson",
    avgScore: 59.7,
  },
  {
    id: 4,
    name: "Monthly Euchre Night",
    date: "January 10, 2025",
    players: 16,
    tables: 4,
    rounds: 4,
    winner: "Emily Davis",
    avgScore: 64.2,
  },
  {
    id: 5,
    name: "Holiday Special",
    date: "December 18, 2024",
    players: 24,
    tables: 6,
    rounds: 4,
    winner: "Alex Rodriguez",
    avgScore: 57.8,
  },
  {
    id: 6,
    name: "Fall Championship",
    date: "November 5, 2024",
    players: 20,
    tables: 5,
    rounds: 4,
    winner: "Jessica Brown",
    avgScore: 61.5,
  },
  {
    id: 7,
    name: "Weekend Tournament",
    date: "October 12, 2024",
    players: 16,
    tables: 4,
    rounds: 4,
    winner: "Ryan Martinez",
    avgScore: 63.9,
  },
]

export default function StatsPage() {
  const [playerStats, setPlayerStats] = useState(mockPlayerStats)
  const [tournamentStats, setTournamentStats] = useState(mockTournamentStats)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("totalScore")
  const [sortDirection, setSortDirection] = useState("desc")
  const [activeTab, setActiveTab] = useState("players")
  const [timeRange, setTimeRange] = useState("all")

  // Filter players based on search term
  const filteredPlayers = playerStats.filter((player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Sort players based on column and direction
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (sortDirection === "asc") {
      return typeof aValue === "string" ? aValue.localeCompare(bValue) : aValue - bValue
    } else {
      return typeof aValue === "string" ? bValue.localeCompare(aValue) : bValue - aValue
    }
  })

  // Handle sort
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/" title="Home">
              <Home className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Statistics & Leaderboards</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Stats
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playerStats.length}</div>
            <p className="text-xs text-muted-foreground">Across all tournaments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tournaments</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tournamentStats.length}</div>
            <p className="text-xs text-muted-foreground">Last: {tournamentStats[0].date}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.max(...playerStats.map((p) => p.highestScore))}</div>
            <p className="text-xs text-muted-foreground">
              By {playerStats.sort((a, b) => b.highestScore - a.highestScore)[0].name}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(playerStats.reduce((acc, p) => acc + p.avgScore, 0) / playerStats.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Per player per tournament</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="players">Player Stats</TabsTrigger>
          <TabsTrigger value="tournaments">Tournament Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="players" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Player Leaderboard</CardTitle>
                  <CardDescription>Historical performance statistics for all players</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search players..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="year">Past Year</SelectItem>
                      <SelectItem value="month">Past Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Rank</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="p-0 font-medium flex items-center"
                          onClick={() => handleSort("name")}
                        >
                          Player Name
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="p-0 font-medium flex items-center"
                          onClick={() => handleSort("totalScore")}
                        >
                          Total Score
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="p-0 font-medium flex items-center"
                          onClick={() => handleSort("highestScore")}
                        >
                          Highest Score
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="p-0 font-medium flex items-center"
                          onClick={() => handleSort("gamesPlayed")}
                        >
                          Games
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="p-0 font-medium flex items-center"
                          onClick={() => handleSort("avgScore")}
                        >
                          Avg Score
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="p-0 font-medium flex items-center"
                          onClick={() => handleSort("winRate")}
                        >
                          Win Rate
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedPlayers.map((player, index) => (
                      <TableRow key={player.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{player.name}</TableCell>
                        <TableCell>{player.totalScore}</TableCell>
                        <TableCell>{player.highestScore}</TableCell>
                        <TableCell>{player.gamesPlayed}</TableCell>
                        <TableCell>{player.avgScore.toFixed(1)}</TableCell>
                        <TableCell>{(player.winRate * 100).toFixed(0)}%</TableCell>
                      </TableRow>
                    ))}
                    {sortedPlayers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No players found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Tournament History</CardTitle>
                  <CardDescription>Statistics for all past tournaments</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="year">Past Year</SelectItem>
                      <SelectItem value="month">Past Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tournament Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Players</TableHead>
                      <TableHead>Tables</TableHead>
                      <TableHead>Rounds</TableHead>
                      <TableHead>Winner</TableHead>
                      <TableHead>Avg Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tournamentStats.map((tournament) => (
                      <TableRow key={tournament.id}>
                        <TableCell className="font-medium">{tournament.name}</TableCell>
                        <TableCell>{tournament.date}</TableCell>
                        <TableCell>{tournament.players}</TableCell>
                        <TableCell>{tournament.tables}</TableCell>
                        <TableCell>{tournament.rounds}</TableCell>
                        <TableCell>{tournament.winner}</TableCell>
                        <TableCell>{tournament.avgScore.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
