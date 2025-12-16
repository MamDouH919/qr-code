import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import "../app/globals.css"
import { Cairo } from "next/font/google"
import { ArabClinicJsonLd } from "@/app/(clients)/arab-clinic/layout"
import ArabClinicPage from "@/app/(clients)/arab-clinic/page"

const cairo = Cairo({
    weight: ["600", "700", "800"],
    subsets: ["latin"],
    display: 'swap'
});

export default async function ArabClinicLayout() {
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
                <Script
                    id="medical-clinic-ld"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(ArabClinicJsonLd.medicalClinic),
                    }}
                />

                <Script
                    id="breadcrumb-ld"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(ArabClinicJsonLd.breadcrumb),
                    }}
                />

            </head>
            <body className={cairo.className}>
                <Suspense fallback={null}>
                    <ArabClinicPage />
                </Suspense>
                <Analytics />
            </body>
        </html>
    )
}