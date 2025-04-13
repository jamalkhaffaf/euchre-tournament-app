"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Home, Minus, Plus, Shuffle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

// Mock data for players
const mockPlayers = [
  { id: 1, name: "Sarah Johnson", selected: false },
  { id: 2, name: "Mike Thompson", selected: false },
  { id: 3, name: "David Wilson", selected: false },
  { id: 4, name: "Emily Davis", selected: false },
  { id: 5, name: "Alex Rodriguez", selected: false },
  { id: 6, name: "Jessica Brown", selected: false },
  { id: 7, name: "Ryan Martinez", selected: false },
  { id: 8, name: "Sophia Lee", selected: false },
  { id: 9, name: "Daniel Taylor", selected: false },
  { id: 10, name: "Olivia White", selected: false },
  { id: 11, name: "William Johnson", selected: false },
  { id: 12, name: "Emma Smith", selected: false },
  { id: 13, name: "James Brown", selected: false },
  { id: 14, name: "Ava Miller", selected: false },
  { id: 15, name: "Benjamin Davis", selected: false },
  { id: 16, name: "Mia Wilson", selected: false },
]

export default function NewTournamentPage() {
  const router = useRouter()
  const [tournamentName, setTournamentName] = useState("")
  const [players, setPlayers] = useState(mockPlayers)
  const [searchTerm, setSearchTerm] = useState("")
  const [numTables, setNumTables] = useState(4)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter players based on search term
  const filteredPlayers = players.filter((player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Count selected players
  const selectedPlayers = players.filter((player) => player.selected)
  const selectedCount = selectedPlayers.length

  // Toggle player selection
  const togglePlayerSelection = (id) => {
    setPlayers(players.map((player) => (player.id === id ? { ...player, selected: !player.selected } : player)))
  }

  // Toggle all players
  const toggleAllPlayers = () => {
    const allSelected = players.every((player) => player.selected)
    setPlayers(players.map((player) => ({ ...player, selected: !allSelected })))
  }

  // Calculate recommended tables
  const recommendedTables = Math.ceil(selectedCount / 4)

  // Increment/decrement tables
  const incrementTables = () => {
    if (numTables < 10) setNumTables(numTables + 1)
  }

  const decrementTables = () => {
    if (numTables > 1) setNumTables(numTables - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!tournamentName.trim()) {
      toast({
        title: "Error",
        description: "Tournament name is required",
        variant: "destructive",
      })
      return
    }

    if (selectedCount < 4) {
      toast({
        title: "Error",
        description: "You need at least 4 players to start a tournament",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: `Tournament "${tournamentName}" has been created`,
      })
      setIsSubmitting(false)
      router.push("/tournaments/1/active")
    }, 1000)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>New Tournament</CardTitle>
              <CardDescription>Set up a new Euchre tournament</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tournament Name</Label>
                <Input
                  id="name"
                  placeholder="Enter tournament name"
                  value={tournamentName}
                  onChange={(e) => setTournamentName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Number of Tables</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={decrementTables}
                    disabled={numTables <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-12 text-center font-medium">{numTables}</div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={incrementTables}
                    disabled={numTables >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>

                  {recommendedTables > 0 && recommendedTables !== numTables && (
                    <Badge variant="outline" className="ml-2">
                      Recommended: {recommendedTables}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Each table requires 4 players (2 teams of 2)</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Selected Players</Label>
                  <Badge variant={selectedCount % 4 === 0 ? "default" : "destructive"}>{selectedCount} selected</Badge>
                </div>

                {selectedCount > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {selectedPlayers.map((player) => (
                      <Badge key={player.id} variant="secondary" className="flex items-center gap-1">
                        {player.name}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => togglePlayerSelection(player.id)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No players selected</p>
                )}

                {selectedCount > 0 && selectedCount % 4 !== 0 && (
                  <p className="text-xs text-destructive">
                    The number of players should be divisible by 4 for balanced tables
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push("/tournaments")}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={selectedCount < 4 || isSubmitting}
                  onClick={() => {
                    // Simulate table assignment preview
                    toast({
                      title: "Table Assignment Preview",
                      description: `${selectedCount} players will be assigned to ${numTables} tables`,
                    })
                  }}
                >
                  <Shuffle className="mr-2 h-4 w-4" />
                  Preview Tables
                </Button>
                <Button type="submit" disabled={selectedCount < 4 || isSubmitting}>
                  {isSubmitting ? "Creating..." : "Start Tournament"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Players</CardTitle>
            <CardDescription>Choose players to participate in this tournament</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="button" variant="outline" className="shrink-0" onClick={toggleAllPlayers}>
                {players.every((player) => player.selected) ? "Deselect All" : "Select All"}
              </Button>
            </div>

            <div className="rounded-md border max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={players.length > 0 && players.every((player) => player.selected)}
                        onCheckedChange={toggleAllPlayers}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>Player Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlayers.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>
                        <Checkbox
                          checked={player.selected}
                          onCheckedChange={() => togglePlayerSelection(player.id)}
                          aria-label={`Select ${player.name}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{player.name}</TableCell>
                    </TableRow>
                  ))}
                  {filteredPlayers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2} className="h-24 text-center">
                        No players found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">{filteredPlayers.length} players available</div>
              <Button asChild variant="link" size="sm">
                <Link href="/players/new">
                  <Plus className="mr-1 h-3 w-3" />
                  Add New Player
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
