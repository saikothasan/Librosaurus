import Link from "next/link"
import { Book } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="flex items-center gap-2 mb-4 sm:mb-0">
          <Book size={24} />
          <span className="text-xl font-bold">Librosaurus</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}

