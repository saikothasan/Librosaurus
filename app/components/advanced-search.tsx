"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Settings } from "lucide-react"

export function AdvancedSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [author, setAuthor] = useState("")
  const [year, setYear] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(window.location.search)
    if (author) params.set("author", author)
    if (year) params.set("year", year)
    router.push(`/?${params.toString()}`)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="mt-2">
          <Settings className="mr-2 h-4 w-4" />
          Advanced Search
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Publication Year</Label>
            <Input
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter publication year"
            />
          </div>
          <Button type="submit" className="w-full">
            Apply Filters
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}

