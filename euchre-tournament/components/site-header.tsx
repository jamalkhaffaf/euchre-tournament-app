import Link from "next/link"
import { Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="icon" asChild>
            <Link href="/" title="Home">
              <Home className="h-4 w-4" />
            </Link>
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-primary">{siteConfig.name}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
