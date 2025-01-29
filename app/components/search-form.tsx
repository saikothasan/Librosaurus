"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Save to recent searches
      const recentSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]")
      const updatedSearches = [query, ...recentSearches.filter((s: string) => s !== query)].slice(0, 5)
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))

      router.push(`/?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-grow">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for PDF books..."
          className="pl-8"
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  )
}

