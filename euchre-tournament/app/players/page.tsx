"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, Download, Home, MoreHorizontal, Plus, Search, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for players
const mockPlayers = [
  { id: 1, name: "Sarah Johnson", currentScore: 156, highestScore: 156, totalScore: 876, gamesPlayed: 12 },
  { id: 2, name: "Mike Thompson", currentScore: 142, highestScore: 142, totalScore: 754, gamesPlayed: 15 },
  { id: 3, name: "David Wilson", currentScore: 138, highestScore: 138, totalScore: 692, gamesPlayed: 14 },
  { id: 4, name: "Emily Davis", currentScore: 129, highestScore: 129, totalScore: 587, gamesPlayed: 10 },
  { id: 5, name: "Alex Rodriguez", currentScore: 124, highestScore: 124, totalScore: 621, gamesPlayed: 11 },
  { id: 6, name: "Jessica Brown", currentScore: 118, highestScore: 132, totalScore: 542, gamesPlayed: 9 },
  { id: 7, name: "Ryan Martinez", currentScore: 112, highestScore: 128, totalScore: 498, gamesPlayed: 8 },
  { id: 8, name: "Sophia Lee", currentScore: 105, highestScore: 120, totalScore: 476, gamesPlayed: 7 },
  { id: 9, name: "Daniel Taylor", currentScore: 98, highestScore: 115, totalScore: 432, gamesPlayed: 6 },
  { id: 10, name: "Olivia White", currentScore: 92, highestScore: 110, totalScore: 398, gamesPlayed: 5 },
]

export default function PlayersPage() {
  const [players, setPlayers] = useState(mockPlayers)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  // Filter players based on search term
  const filteredPlayers = players.filter((player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
          <h1 className="text-3xl font-bold">Player Management</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/players/import">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Link>
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link href="/players/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Player
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Players</CardTitle>
          <CardDescription>Manage your player database for tournaments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
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
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {sortedPlayers.length} Players
              </Badge>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
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
                      onClick={() => handleSort("currentScore")}
                    >
                      Current Score
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
                      onClick={() => handleSort("gamesPlayed")}
                    >
                      Games
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPlayers.map((player, index) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.currentScore}</TableCell>
                    <TableCell>{player.highestScore}</TableCell>
                    <TableCell>{player.totalScore}</TableCell>
                    <TableCell>{player.gamesPlayed}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link href={`/players/${player.id}`}>View details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/players/${player.id}/edit`}>Edit player</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete player</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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
    </div>
  )
}
