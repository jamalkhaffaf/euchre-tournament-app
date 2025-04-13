"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Home, Medal, Share } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock data for tournament results
const mockResults = {
  id: 1,
  name: "Spring Euchre Classic",
  date: "April 12, 2025",
  rounds: 4,
  tables: 4,
  players: [
    { id: 1, name: "Sarah Johnson", score: 156, rank: 1 },
    { id: 2, name: "Mike Thompson", score: 142, rank: 2 },
    { id: 3, name: "David Wilson", score: 138, rank: 3 },
    { id: 4, name: "Emily Davis", score: 129, rank: 4 },
    { id: 5, name: "Alex Rodriguez", score: 124, rank: 5 },
    { id: 6, name: "Jessica Brown", score: 118, rank: 6 },
    { id: 7, name: "Ryan Martinez", score: 112, rank: 7 },
    { id: 8, name: "Sophia Lee", score: 105, rank: 8 },
    { id: 9, name: "Daniel Taylor", score: 98, rank: 9 },
    { id: 10, name: "Olivia White", score: 92, rank: 10 },
    { id: 11, name: "William Johnson", score: 88, rank: 11 },
    { id: 12, name: "Emma Smith", score: 85, rank: 12 },
    { id: 13, name: "James Brown", score: 82, rank: 13 },
    { id: 14, name: "Ava Miller", score: 78, rank: 14 },
    { id: 15, name: "Benjamin Davis", score: 75, rank: 15 },
    { id: 16, name: "Mia Wilson", score: 72, rank: 16 },
  ],
  roundResults: [
    {
      round: 1,
      tables: [
        {
          id: 1,
          teams: [
            { id: 1, players: ["Sarah Johnson", "Mike Thompson"], score: 10 },
            { id: 2, players: ["David Wilson", "Emily Davis"], score: 6 },
          ],
        },
        {
          id: 2,
          teams: [
            { id: 3, players: ["Alex Rodriguez", "Jessica Brown"], score: 8 },
            { id: 4, players: ["Ryan Martinez", "Sophia Lee"], score: 7 },
          ],
        },
        {
          id: 3,
          teams: [
            { id: 5, players: ["Daniel Taylor", "Olivia White"], score: 5 },
            { id: 6, players: ["William Johnson", "Emma Smith"], score: 9 },
          ],
        },
        {
          id: 4,
          teams: [
            { id: 7, players: ["James Brown", "Ava Miller"], score: 7 },
            { id: 8, players: ["Benjamin Davis", "Mia Wilson"], score: 8 },
          ],
        },
      ],
    },
    {
      round: 2,
      tables: [
        {
          id: 1,
          teams: [
            { id: 1, players: ["Sarah Johnson", "David Wilson"], score: 10 },
            { id: 2, players: ["Alex Rodriguez", "Ryan Martinez"], score: 5 },
          ],
        },
        {
          id: 2,
          teams: [
            { id: 3, players: ["Mike Thompson", "Emily Davis"], score: 9 },
            { id: 4, players: ["Jessica Brown", "Sophia Lee"], score: 6 },
          ],
        },
        {
          id: 3,
          teams: [
            { id: 5, players: ["Daniel Taylor", "William Johnson"], score: 7 },
            { id: 6, players: ["James Brown", "Benjamin Davis"], score: 8 },
          ],
        },
        {
          id: 4,
          teams: [
            { id: 7, players: ["Olivia White", "Emma Smith"], score: 9 },
            { id: 8, players: ["Ava Miller", "Mia Wilson"], score: 6 },
          ],
        },
      ],
    },
    {
      round: 3,
      tables: [
        {
          id: 1,
          teams: [
            { id: 1, players: ["Sarah Johnson", "Alex Rodriguez"], score: 10 },
            { id: 2, players: ["Mike Thompson", "Jessica Brown"], score: 7 },
          ],
        },
        {
          id: 2,
          teams: [
            { id: 3, players: ["David Wilson", "Ryan Martinez"], score: 8 },
            { id: 4, players: ["Emily Davis", "Sophia Lee"], score: 9 },
          ],
        },
        {
          id: 3,
          teams: [
            { id: 5, players: ["Daniel Taylor", "James Brown"], score: 6 },
            { id: 6, players: ["Olivia White", "Ava Miller"], score: 8 },
          ],
        },
        {
          id: 4,
          teams: [
            { id: 7, players: ["William Johnson", "Benjamin Davis"], score: 7 },
            { id: 8, players: ["Emma Smith", "Mia Wilson"], score: 5 },
          ],
        },
      ],
    },
    {
      round: 4,
      tables: [
        {
          id: 1,
          teams: [
            { id: 1, players: ["Sarah Johnson", "Jessica Brown"], score: 10 },
            { id: 2, players: ["David Wilson", "Sophia Lee"], score: 6 },
          ],
        },
        {
          id: 2,
          teams: [
            { id: 3, players: ["Mike Thompson", "Alex Rodriguez"], score: 9 },
            { id: 4, players: ["Emily Davis", "Ryan Martinez"], score: 7 },
          ],
        },
        {
          id: 3,
          teams: [
            { id: 5, players: ["Daniel Taylor", "Ava Miller"], score: 8 },
            { id: 6, players: ["William Johnson", "Mia Wilson"], score: 6 },
          ],
        },
        {
          id: 4,
          teams: [
            { id: 7, players: ["Olivia White", "Benjamin Davis"], score: 7 },
            { id: 8, players: ["Emma Smith", "James Brown"], score: 5 },
          ],
        },
      ],
    },
  ],
}

export default function TournamentResultsPage() {
  const [results, setResults] = useState(mockResults)
  const [activeTab, setActiveTab] = useState("standings")

  const handleExport = () => {
    toast({
      title: "Exporting Results",
      description: "Tournament results are being exported as CSV",
    })
  }

  const handleShare = () => {
    toast({
      title: "Share Link Copied",
      description: "Tournament results link copied to clipboard",
    })
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href="/tournaments">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tournaments
            </Link>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShare}>
            <Share className="mr-2 h-4 w-4" />
            Share Results
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{results.name} - Results</CardTitle>
              <CardDescription>
                {results.date} • {results.players.length} Players • {results.rounds} Rounds
              </CardDescription>
            </div>
            <Badge className="text-lg px-3 py-1">Complete</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Winners</CardTitle>
            <CardDescription>Top 3 players</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {results.players.slice(0, 3).map((player) => (
              <div key={player.id} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Medal
                    className={`h-6 w-6 ${
                      player.rank === 1 ? "text-yellow-500" : player.rank === 2 ? "text-gray-400" : "text-amber-700"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{player.name}</h3>
                  <p className="text-sm text-muted-foreground">Rank #{player.rank}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{player.score}</p>
                  <p className="text-sm text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tournament Summary</CardTitle>
            <CardDescription>Final standings and round details</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="standings">Standings</TabsTrigger>
                <TabsTrigger value="rounds">Rounds</TabsTrigger>
              </TabsList>

              <TabsContent value="standings" className="space-y-4">
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
                      {results.players.map((player) => (
                        <tr key={player.id} className="border-b">
                          <td className="p-4 align-middle font-medium">{player.rank}</td>
                          <td className="p-4 align-middle">{player.name}</td>
                          <td className="p-4 align-middle text-right">{player.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="rounds" className="space-y-4">
                <div className="space-y-4">
                  {results.roundResults.map((round) => (
                    <div key={round.round}>
                      <h3 className="font-medium mb-2">Round {round.round}</h3>
                      <div className="grid gap-2 md:grid-cols-2">
                        {round.tables.map((table) => (
                          <div key={table.id} className="border rounded-md p-3">
                            <div className="font-medium mb-2">Table {table.id}</div>
                            <div className="space-y-2">
                              {table.teams.map((team) => (
                                <div key={team.id} className="flex justify-between items-center">
                                  <div className="text-sm">{team.players.join(" & ")}</div>
                                  <Badge variant="outline">{team.score} pts</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      {round.round < results.rounds && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
