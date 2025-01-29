"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem("recentSearches") || "[]")
    setRecentSearches(searches)
  }, [])

  if (recentSearches.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">Recent Excavations</h2>
      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
        {recentSearches.map((search, index) => (
          <Button key={index} variant="outline" asChild className="text-sm">
            <Link href={`/?q=${encodeURIComponent(search)}`}>
              <Clock className="mr-2 h-4 w-4" />
              {search}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}

