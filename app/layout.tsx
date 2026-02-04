import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"
import { Cairo } from "next/font/google"
import "swiper/css";
import "swiper/css/navigation";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { headers } from "next/headers"
import ArabClinicLayout from "@/domains/ArabClinic"
import { ArabClinicMetaData } from "./(clients)/arab-clinic/layout"
import DrCoffeeLayout from "@/domains/DrCoffee"
import { DrCoffeeMetaData } from "./(clients)/dr-coffee/layout"
import { OSAMetaData } from "./(clients)/osa/layout"
import OSALayout from "@/domains/OSA"

const cairo = Cairo({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  display: 'swap'
});

const siteUrl = 'https://qr-test.mountain-egy.site/'; // Update with your actual domain
const siteName = 'QR Code Generator';
const siteTitle = 'Custom QR | Digital Business Cards';
const siteDescription = 'Generate custom QR codes linked to personalized client pages. Perfect for businesses, restaurants, and individuals. Create digital business cards with QR codes instantly.';
const siteKeywords = 'QR Code Generator, Custom QR for business, Digital business card QR, QR for shops and restaurants, personalized QR codes, client pages, QR code maker, free QR generator, business QR codes, restaurant QR menu';
const ogImage = `/mountain/logo.webp`; // Update with your OG image path

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host")
  const domain = host?.split(":")[0];

  // ❌ No metadata for other domains
  if (domain === "qr.arabclinic.net") {
    return ArabClinicMetaData;
  }
  if (domain === "dr-coffee.softwave.site") {
    return DrCoffeeMetaData;
  }
  if (domain === "qr.osaoptics.com") {
    return OSAMetaData;
  }

  return {
    metadataBase: new URL(siteUrl),
    title: siteTitle,
    description: siteDescription,
    keywords: siteKeywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    generator: "mountain-egy.site",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        'en': siteUrl,
        'x-default': siteUrl,
      },
    },
    openGraph: {
      type: 'website',
      url: siteUrl,
      title: siteTitle,
      description: siteDescription,
      siteName: siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
      locale: 'ar-EG',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [ogImage],
    },
    icons: {
      icon: [
        { url: '/mountain/favicon.ico' },
        { url: '/mountain/icon0.svg', sizes: '16x16', type: 'image/png' },
        { url: '/mountain/icon1.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: '/mountain/apple-icon.png',
      other: [
        {
          rel: 'mask-icon',
          url: '/safari-pinned-tab.svg',
        },
      ],
    },
    manifest: '/mountain/manifest.json',
    other: {
      'language': 'English',
      'revisit-after': '7 days',
      'rating': 'general',
    },
    category: 'technology',
  }
}

// JSON-LD Structured Data
const jsonLd = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/mountain/logo.webp`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@yoursite.com', // Update with your email
    },
    sameAs: [
      "https://www.facebook.com/@m.mountain.agency/",
      "https://www.instagram.com/mm_adv_agency",
    ],
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    description: siteDescription,
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  webApplication: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Custom QR Code Generation',
      'Digital Business Cards',
      'Personalized Client Pages',
      'Restaurant Menu QR Codes',
      'Business Contact QR Codes',
    ],
  },
  breadcrumb: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
    ],
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I create a custom QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply enter your information, customize the design, and generate your QR code instantly. You can link it to your digital business card or client page.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the QR codes free to generate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can generate custom QR codes for free with our tool.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use QR codes for my restaurant menu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Our QR code generator is perfect for restaurant menus, allowing customers to scan and view your menu digitally.',
        },
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const host = (await headers()).get("host");
  const domain = host?.split(":")[0];

  if (domain === "qr.arabclinic.net") {
    return <ArabClinicLayout />
  }

  if (domain === "dr-coffee.softwave.site") {
    return <DrCoffeeLayout />
  }

  if (domain === "qr.osaoptics.com") {
    return <OSALayout />
  }

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
          id="organization-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd.organization),
          }}
        />

        <Script
          id="website-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd.website),
          }}
        />

        <Script
          id="web-application-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd.webApplication),
          }}
        />

        <Script
          id="breadcrumb-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd.breadcrumb),
          }}
        />

        <Script
          id="faq-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd.faq),
          }}
        />
      </head>
      <body className={cairo.className}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}