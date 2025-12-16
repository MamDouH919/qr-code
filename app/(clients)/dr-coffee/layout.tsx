import { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://qr-test.mountain-egy.site/";
const siteName = "Dr Coffee - بن الدكتور";
const siteTitle = "Dr Coffee - بن الدكتور | كافيه وقهوة مختصة في مدينة نصر";
const siteDescription =
  "دكتور كوفي - بن الدكتور، كافيه وقهوة مختصة في مدينة نصر. بن محمص طازج، قهوة إسبريسو، لاتيه، ومشروبات ساخنة وباردة بأعلى جودة.";
const siteKeywords =
  "Dr Coffee, بن الدكتور, دكتور كوفي, كافيه مدينة نصر, قهوة مختصة مدينة نصر, coffee shop Nasr City, specialty coffee Egypt";
const ogImage = "/dr-coffee/logo.webp";
const icon = "/dr-coffee/favicon.ico";

export const DrCoffeeMetaData: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: siteName }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      ar: siteUrl,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: ogImage,
        alt: siteName,
      },
    ],
    locale: "ar-EG",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  icons: {
    icon: icon,
    apple: "/dr-coffee/apple-icon.png",
  },
  other: {
    "geo.region": "EG",
    "geo.placename": "Nasr City, Cairo, Egypt",
    "geo.position": "30.0566;31.3301",
    ICBM: "30.0566, 31.3301",
    language: "Arabic",
    "revisit-after": "3 days",
  },
};

export const metadata: Metadata = DrCoffeeMetaData;

// JSON-LD Structured Data
export const DrCoffeeJsonLd = {
  cafe: {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: ogImage,
    image: ogImage,
    servesCuisine: ["Coffee", "Specialty Coffee", "Desserts"],
    priceRange: "$$",
    telephone: "+2010XXXXXXX",
    address: {
      "@type": "PostalAddress",
      streetAddress: "مدينة نصر",
      addressLocality: "Nasr City",
      addressRegion: "Cairo Governorate",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0566,
      longitude: 31.3301,
    },
    areaServed: {
      "@type": "City",
      name: "Cairo",
    },
    paymentAccepted: ["Cash", "Credit Card", "Mobile Payment"],
  },

  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: siteUrl,
      },
    ],
  },

  localBusiness: {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": siteUrl,
    name: siteName,
    image: ogImage,
    url: siteUrl,
    telephone: "+2010XXXXXXX",
    address: {
      "@type": "PostalAddress",
      streetAddress: "مدينة نصر",
      addressLocality: "Nasr City",
      addressRegion: "Cairo",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0566,
      longitude: 31.3301,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "23:59",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="cafe-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(DrCoffeeJsonLd.cafe),
        }}
      />

      <Script
        id="breadcrumb-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(DrCoffeeJsonLd.breadcrumb),
        }}
      />

      <Script
        id="local-business-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(DrCoffeeJsonLd.localBusiness),
        }}
      />

      {children}
    </>
  );
}