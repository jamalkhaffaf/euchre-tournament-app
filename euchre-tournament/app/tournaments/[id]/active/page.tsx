"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check, Home, Shuffle, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for active tournament
const mockTournament = {
  id: 1,
  name: "Spring Euchre Classic",
  date: "April 12, 2025",
  currentRound: 1,
  totalRounds: 4,
  tables: [
    {
      id: 1,
      teams: [
        {
          id: 1,
          name: "Team 1",
          players: ["Sarah Johnson", "Mike Thompson"],
          score: 0,
        },
        {
          id: 2,
          name: "Team 2",
          players: ["David Wilson", "Emily Davis"],
          score: 0,
        },
      ],
      gameComplete: false,
    },
    {
      id: 2,
      teams: [
        {
          id: 3,
          name: "Team 3",
          players: ["Alex Rodriguez", "Jessica Brown"],
          score: 0,
        },
        {
          id: 4,
          name: "Team 4",
          players: ["Ryan Martinez", "Sophia Lee"],
          score: 0,
        },
      ],
      gameComplete: false,
    },
    {
      id: 3,
      teams: [
        {
          id: 5,
          name: "Team 5",
          players: ["Daniel Taylor", "Olivia White"],
          score: 0,
        },
        {
          id: 6,
          name: "Team 6",
          players: ["William Johnson", "Emma Smith"],
          score: 0,
        },
      ],
      gameComplete: false,
    },
    {
      id: 4,
      teams: [
        {
          id: 7,
          name: "Team 7",
          players: ["James Brown", "Ava Miller"],
          score: 0,
        },
        {
          id: 8,
          name: "Team 8",
          players: ["Benjamin Davis", "Mia Wilson"],
          score: 0,
        },
      ],
      gameComplete: false,
    },
  ],
  players: [
    { id: 1, name: "Sarah Johnson", score: 0 },
    { id: 2, name: "Mike Thompson", score: 0 },
    { id: 3, name: "David Wilson", score: 0 },
    { id: 4, name: "Emily Davis", score: 0 },
    { id: 5, name: "Alex Rodriguez", score: 0 },
    { id: 6, name: "Jessica Brown", score: 0 },
    { id: 7, name: "Ryan Martinez", score: 0 },
    { id: 8, name: "Sophia Lee", score: 0 },
    { id: 9, name: "Daniel Taylor", score: 0 },
    { id: 10, name: "Olivia White", score: 0 },
    { id: 11, name: "William Johnson", score: 0 },
    { id: 12, name: "Emma Smith", score: 0 },
    { id: 13, name: "James Brown", score: 0 },
    { id: 14, name: "Ava Miller", score: 0 },
    { id: 15, name: "Benjamin Davis", score: 0 },
    { id: 16, name: "Mia Wilson", score: 0 },
  ],
}

export default function ActiveTournamentPage({ params }) {
  const router = useRouter()
  const [tournament, setTournament] = useState(mockTournament)
  const [tables, setTables] = useState(mockTournament.tables)
  const [currentRound, setCurrentRound] = useState(1)
  const [activeTab, setActiveTab] = useState("tables")

  // Update team score
  const updateTeamScore = (tableId, teamId, score) => {
    const newScore = Number.parseInt(score) || 0

    setTables(
      tables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              teams: table.teams.map((team) => (team.id === teamId ? { ...team, score: newScore } : team)),
            }
          : table,
      ),
    )
  }

  // Mark game as complete
  const markGameComplete = (tableId) => {
    setTables(tables.map((table) => (table.id === tableId ? { ...table, gameComplete: true } : table)))

    // Check if all games are complete
    const updatedTables = tables.map((table) => (table.id === tableId ? { ...table, gameComplete: true } : table))

    const allGamesComplete = updatedTables.every((table) => table.gameComplete)

    if (allGamesComplete) {
      toast({
        title: "Round Complete",
        description: `All games for Round ${currentRound} are complete`,
      })
    } else {
      toast({
        title: "Game Marked Complete",
        description: `Table ${tableId} results recorded`,
      })
    }
  }

  // Start next round
  const startNextRound = () => {
    // Check if all games are complete
    if (!tables.every((table) => table.gameComplete)) {
      toast({
        title: "Error",
        description: "All games must be complete before starting the next round",
        variant: "destructive",
      })
      return
    }

    // Update player scores based on team scores
    const updatedPlayers = [...tournament.players]

    tables.forEach((table) => {
      table.teams.forEach((team) => {
        team.players.forEach((playerName) => {
          const playerIndex = updatedPlayers.findIndex((p) => p.name === playerName)
          if (playerIndex !== -1) {
            updatedPlayers[playerIndex].score += team.score
          }
        })
      })
    })

    // Simulate new round with reshuffled teams
    const newRound = currentRound + 1

    // Reset tables for new round
    const resetTables = tables.map((table) => ({
      ...table,
      gameComplete: false,
      teams: table.teams.map((team) => ({
        ...team,
        score: 0,
      })),
    }))

    setTournament({
      ...tournament,
      currentRound: newRound,
      players: updatedPlayers,
    })
    setTables(resetTables)
    setCurrentRound(newRound)

    toast({
      title: "New Round Started",
      description: `Round ${newRound} has begun with new team assignments`,
    })
  }

  // End tournament
  const endTournament = () => {
    // Check if all games are complete
    if (!tables.every((table) => table.gameComplete)) {
      toast({
        title: "Error",
        description: "All games must be complete before ending the tournament",
        variant: "destructive",
      })
      return
    }

    // Update player scores based on team scores
    const updatedPlayers = [...tournament.players]

    tables.forEach((table) => {
      table.teams.forEach((team) => {
        team.players.forEach((playerName) => {
          const playerIndex = updatedPlayers.findIndex((p) => p.name === playerName)
          if (playerIndex !== -1) {
            updatedPlayers[playerIndex].score += team.score
          }
        })
      })
    })

    // Sort players by score to determine winner
    const sortedPlayers = [...updatedPlayers].sort((a, b) => b.score - a.score)
    const winner = sortedPlayers[0]

    toast({
      title: "Tournament Complete",
      description: `${winner.name} wins with ${winner.score} points!`,
    })

    // Navigate to results page
    setTimeout(() => {
      router.push(`/tournaments/${params.id}/results`)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/" title="Home">
              <Home className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/tournaments">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tournaments
            </Link>
          </Button>
        </div>
        <div className="flex gap-2">
          {currentRound < tournament.totalRounds ? (
            <Button onClick={startNextRound}>
              <Shuffle className="mr-2 h-4 w-4" />
              Start Round {currentRound + 1}
            </Button>
          ) : (
            <Button onClick={endTournament}>
              <Trophy className="mr-2 h-4 w-4" />
              End Tournament
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{tournament.name}</CardTitle>
                <CardDescription>{tournament.date}</CardDescription>
              </div>
              <Badge className="text-lg px-3 py-1">
                Round {currentRound} of {tournament.totalRounds}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="standings">Standings</TabsTrigger>
          </TabsList>

          <TabsContent value="tables" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {tables.map((table) => (
                <Card key={table.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Table {table.id}</CardTitle>
                      {table.gameComplete ? (
                        <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-100">
                          <Check className="mr-1 h-3 w-3" />
                          Complete
                        </Badge>
                      ) : (
                        <Badge variant="outline">In Progress</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      {table.teams.map((team) => (
                        <div key={team.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor={`score-${table.id}-${team.id}`}>
                              {team.name}: {team.players.join(" & ")}
                            </Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id={`score-${table.id}-${team.id}`}
                                type="number"
                                min="0"
                                max="10"
                                className="w-16 text-center"
                                value={team.score}
                                onChange={(e) => updateTeamScore(table.id, team.id, e.target.value)}
                                disabled={table.gameComplete}
                              />
                              <span className="text-sm font-medium">pts</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={table.gameComplete ? "outline" : "default"}
                      onClick={() => markGameComplete(table.id)}
                      disabled={table.gameComplete}
                    >
                      {table.gameComplete ? "Game Complete" : "Mark Complete"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="standings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Standings</CardTitle>
                <CardDescription>Player scores after {currentRound - 1} completed rounds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-10 px-4 text-left font-medium">Rank</th>
                        <th className="h-10 px-4 text-left font-medium">Player</th>
                        <th className="h-10 px-4 text-right font-medium">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...tournament.players]
                        .sort((a, b) => b.score - a.score)
                        .map((player, index) => (
                          <tr key={player.id} className="border-b">
                            <td className="p-4 align-middle font-medium">{index + 1}</td>
                            <td className="p-4 align-middle">{player.name}</td>
                            <td className="p-4 align-middle text-right">{player.score}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
