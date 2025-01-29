import { Suspense } from "react"
import { SearchForm } from "./components/search-form"
import { SearchResults } from "./components/search-results"
import { Skeleton } from "@/components/ui/skeleton"
import { RecentSearches } from "./components/recent-searches"
import { AdvancedSearch } from "./components/advanced-search"

export default function Home({
  searchParams,
}: {
  searchParams: { q?: string; page?: string; [key: string]: string | undefined }
}) {
  const query = searchParams.q
  const page = searchParams.page ? Number.parseInt(searchParams.page, 10) : 1

  return (
    <div className="space-y-8">
      <section className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to Librosaurus</h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6">
          Unearth knowledge: Excavate and download free PDF books from our prehistoric collection.
        </p>
        <SearchForm initialQuery={query} />
        <AdvancedSearch />
      </section>
      {query ? (
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults query={query} page={page} advancedParams={searchParams} />
        </Suspense>
      ) : (
        <RecentSearches />
      )}
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-full sm:w-1/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  )
}

