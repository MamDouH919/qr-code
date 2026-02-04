import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import "../app/globals.css"
import { Cairo } from "next/font/google"
import OSAPage from "@/app/(clients)/osa/page"
import { OSAJsonLd } from "@/app/(clients)/osa/layout"

const cairo = Cairo({
    weight: ["600", "700", "800"],
    subsets: ["latin"],
    display: 'swap'
});

export default async function OSALayout() {
    return (
        <html lang="en">
            <head>
                {/* Additional SEO Meta Tags */}
                <meta name="theme-color" content="#000000" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />

                {/* Structured Data Scripts */}
            </head>
            <body className={cairo.className}>
                <Suspense fallback={null}>
                    <OSAPage />
                </Suspense>
                <Analytics />
            </body>
        </html>
    )
}