"use server"

import { z } from "zod"

const searchResultSchema = z.object({
  items: z.array(
    z.object({
      title: z.string(),
      link: z.string(),
      snippet: z.string(),
      fileFormat: z.string().optional(),
    }),
  ),
  searchInformation: z.object({
    totalResults: z.string(),
  }),
})

export type SearchResult = z.infer<typeof searchResultSchema>["items"][number]

export async function searchBooks(query: string, page = 1, advancedParams: { [key: string]: string | undefined } = {}) {
  const apiKey = process.env.GOOGLE_API_KEY
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID

  if (!apiKey || !searchEngineId) {
    throw new Error("Missing API key or search engine ID")
  }

  const startIndex = (page - 1) * 10 + 1

  let searchQuery = `${query} filetype:pdf`
  if (advancedParams.author) {
    searchQuery += ` author:${advancedParams.author}`
  }
  if (advancedParams.year) {
    searchQuery += ` ${advancedParams.year}`
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(
        searchQuery,
      )}&start=${startIndex}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch search results")
    }

    const data = await response.json()
    const validatedData = searchResultSchema.parse(data)

    return {
      items: validatedData.items.map((item) => ({
        ...item,
        fileFormat: "PDF",
      })),
      totalResults: Number.parseInt(validatedData.searchInformation.totalResults, 10),
    }
  } catch (error) {
    console.error("Error in searchBooks:", error)
    return {
      items: [],
      totalResults: 0,
    }
  }
}

