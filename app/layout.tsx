import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import ThemeRegistry from "@/lib/theme-registry"

export const metadata: Metadata = {
  title: "Custom QR Code Generator | Digital Business Cards & Client Pages",
  description:
    "Generate custom QR codes linked to personalized client pages. Perfect for businesses, restaurants, and individuals. Create digital business cards with QR codes instantly.",
  keywords:
    "QR Code Generator, Custom QR for business, Digital business card QR, QR for shops and restaurants, personalized QR codes, client pages",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {/* <ThemeRegistry> */}
            {children}
          {/* </ThemeRegistry> */}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
