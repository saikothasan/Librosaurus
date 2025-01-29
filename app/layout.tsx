import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "./components/theme-provider"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Librosaurus | Unearth Free PDF Books",
  description:
    "Excavate knowledge with Librosaurus. Search and download free PDF books from across the web. Discover a prehistoric collection of educational resources, literature, and more.",
  keywords: "PDF books, ebooks, free downloads, digital library, book search, Librosaurus",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://librosaurus.vercel.app",
    siteName: "Librosaurus",
    images: [
      {
        url: "https://librosaurus.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Librosaurus - Unearth Free PDF Books",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@librosaurus",
    creator: "@librosaurus",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

