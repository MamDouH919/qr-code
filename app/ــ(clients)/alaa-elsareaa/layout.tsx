import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
const siteName = 'Alaa Elsareaa';
const siteTitle = 'علي السريع السريع - تأجير سيارات مع سائق';
const siteDescription = "علي السريع السريع لتأجير السيارات مع سائق… احجز سيارتك في ثواني، اختار السيارة اللي تناسبك واستمتع برحلة مريحة وآمنة مع سائقين محترفين على مدار الساعة";
const siteKeywords = 'علي السريع السريع, تأجير سيارات, تأجير سيارات مع سائق, سيارات بسائق مصر, حجز سيارة, Alaa Elsareaa, car rental with driver, Egypt car rental';
const ogImage = `/alaa-elsareaa/logo.webp`;

export const AlaaElsareaaMetaData: Metadata = {
  metadataBase: new URL(siteUrl ?? ""),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'Alaa Elsareaa' }],
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
      'ar': siteUrl,
      'en': `${siteUrl}/en`,
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
    icon: '/alaa-elsareaa/favicon.ico',
    apple: '/alaa-elsareaa/apple-icon.png',
  },
  other: {
    'geo.region': 'EG',
    'geo.placename': 'Benha, Egypt',
    'geo.position': '30.4667;31.1867',
    'ICBM': '30.4667, 31.1867',
    'language': 'Arabic',
    'revisit-after': '7 days',
  },
}
export const metadata: Metadata = AlaaElsareaaMetaData;

// JSON-LD Structured Data
export const AlaaElsareaaJsonLd = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    '@id': siteUrl,
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `/alaa-elsareaa/logo.webp`,
    image: ogImage,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Benha',
      addressRegion: 'Qalyubia Governorate',
      addressCountry: 'EG',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Egypt',
    },
    currenciesAccepted: 'EGP',
    paymentAccepted: 'Cash, Credit Card, Debit Card, Online Payment',
    priceRange: '$$',
  },
  webSite: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  breadcrumb: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: siteUrl,
      },
    ],
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="organization-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(AlaaElsareaaJsonLd.organization),
        }}
      />

      <Script
        id="website-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(AlaaElsareaaJsonLd.webSite),
        }}
      />

      <Script
        id="breadcrumb-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(AlaaElsareaaJsonLd.breadcrumb),
        }}
      />
      {children}
    </>

  );
}
