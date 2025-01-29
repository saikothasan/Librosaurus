import Link from "next/link"
import { searchBooks, type SearchResult } from "../actions/search"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink } from "lucide-react"

export async function SearchResults({
  query,
  page,
  advancedParams,
}: {
  query: string
  page: number
  advancedParams: { [key: string]: string | undefined }
}) {
  const { items, totalResults } = await searchBooks(query, page, advancedParams)

  if (items.length === 0) {
    return <p className="text-center text-muted-foreground">No fossils found. Try a different excavation term.</p>
  }

  const totalPages = Math.ceil(totalResults / 10)

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground text-center sm:text-left">
        Unearthed {(page - 1) * 10 + 1}-{Math.min(page * 10, totalResults)} out of {totalResults} fossils
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((result, index) => (
          <SearchResultCard key={index} result={result} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} query={query} advancedParams={advancedParams} />
    </div>
  )
}

function SearchResultCard({ result }: { result: SearchResult }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-start gap-2 text-lg">
          <FileText className="h-5 w-5 mt-1 text-muted-foreground flex-shrink-0" />
          <span className="line-clamp-2">{result.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{result.snippet}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <a
            href={result.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Excavate PDF
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

function Pagination({
  currentPage,
  totalPages,
  query,
  advancedParams,
}: {
  currentPage: number
  totalPages: number
  query: string
  advancedParams: { [key: string]: string | undefined }
}) {
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams({ ...advancedParams, q: query, page: page.toString() })
    return `/?${params.toString()}`
  }

  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {currentPage > 1 && (
        <Button asChild variant="outline">
          <Link href={getPageUrl(currentPage - 1)}>Previous Era</Link>
        </Button>
      )}
      {currentPage < totalPages && (
        <Button asChild variant="outline">
          <Link href={getPageUrl(currentPage + 1)}>Next Era</Link>
        </Button>
      )}
    </div>
  )
}

