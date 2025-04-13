"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, Download, Home, MoreHorizontal, Plus, Search } from "lucide-react"

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

// Mock data for tournaments
const mockTournaments = [
  {
    id: 1,
    name: "Spring Euchre Classic",
    date: "April 5, 2025",
    players: 16,
    tables: 4,
    rounds: 4,
    winner: "Sarah Johnson",
    status: "completed",
  },
  {
    id: 2,
    name: "Friday Night Euchre",
    date: "March 22, 2025",
    players: 12,
    tables: 3,
    rounds: 4,
    winner: "Mike Thompson",
    status: "completed",
  },
  {
    id: 3,
    name: "Winter Tournament",
    date: "February 15, 2025",
    players: 20,
    tables: 5,
    rounds: 4,
    winner: "David Wilson",
    status: "completed",
  },
  {
    id: 4,
    name: "Monthly Euchre Night",
    date: "January 10, 2025",
    players: 16,
    tables: 4,
    rounds: 4,
    winner: "Emily Davis",
    status: "completed",
  },
  {
    id: 5,
    name: "Holiday Special",
    date: "December 18, 2024",
    players: 24,
    tables: 6,
    rounds: 4,
    winner: "Alex Rodriguez",
    status: "completed",
  },
  {
    id: 6,
    name: "Fall Championship",
    date: "November 5, 2024",
    players: 20,
    tables: 5,
    rounds: 4,
    winner: "Jessica Brown",
    status: "completed",
  },
  {
    id: 7,
    name: "Weekend Tournament",
    date: "October 12, 2024",
    players: 16,
    tables: 4,
    rounds: 4,
    winner: "Ryan Martinez",
    status: "completed",
  },
]

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState(mockTournaments)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")

  // Filter tournaments based on search term
  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort tournaments based on column and direction
  const sortedTournaments = [...filteredTournaments].sort((a, b) => {
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
          <h1 className="text-3xl font-bold">Tournament History</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link href="/tournaments/new">
              <Plus className="mr-2 h-4 w-4" />
              New Tournament
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tournaments</CardTitle>
          <CardDescription>View and manage your Euchre tournaments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tournaments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {sortedTournaments.length} Tournaments
              </Badge>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 font-medium flex items-center"
                      onClick={() => handleSort("name")}
                    >
                      Tournament Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 font-medium flex items-center"
                      onClick={() => handleSort("date")}
                    >
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 font-medium flex items-center"
                      onClick={() => handleSort("players")}
                    >
                      Players
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Tables</TableHead>
                  <TableHead>Rounds</TableHead>
                  <TableHead>Winner</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTournaments.map((tournament) => (
                  <TableRow key={tournament.id}>
                    <TableCell className="font-medium">{tournament.name}</TableCell>
                    <TableCell>{tournament.date}</TableCell>
                    <TableCell>{tournament.players}</TableCell>
                    <TableCell>{tournament.tables}</TableCell>
                    <TableCell>{tournament.rounds}</TableCell>
                    <TableCell>{tournament.winner}</TableCell>
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
                            <Link href={`/tournaments/${tournament.id}`}>View details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/tournaments/${tournament.id}/export`}>Export results</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete tournament</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {sortedTournaments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No tournaments found.
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
