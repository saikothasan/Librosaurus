"use client"

import { useToast } from "@/hooks/use-toast"

export function useErrorHandler() {
  const { toast } = useToast()

  return (error: unknown) => {
    console.error(error)
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "An unexpected error occurred",
      variant: "destructive",
    })
  }
}

