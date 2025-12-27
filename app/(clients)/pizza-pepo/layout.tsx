import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
const siteName = 'Pizza Bebo';
const siteTitle = 'Pizza Bebo - مطعم بيتزا ببنها';
const siteDescription = "بيتزا بيبو - أفضل مطعم بيتزا في بنها، القليوبية. نقدم بيتزا طازجة ولذيذة مع أجود المكونات وأفضل الأسعار. توصيل سريع لجميع أنحاء بنها.";
const siteKeywords = 'بيتزا بيبو, Pizza Bebo, مطعم بيتزا بنها, بيتزا القليوبية, توصيل بيتزا بنها, مطاعم بنها, أفضل بيتزا في بنها, pizza delivery Benha, Benha restaurants, Egyptian pizza';
const ogImage = `/pizza-pepo/logo.webp`;
const icon = '/pizza-pepo/favicon.ico';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? ""),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'Pizza Bebo' }],
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
    icon: icon,
    apple: '/pizza-pepo/apple-icon.png',
  },
  other: {
    'geo.region': 'EG',
    'geo.placename': 'Benha, Qalyubia, Egypt',
    'geo.position': '30.4667;31.1833',
    'ICBM': '30.4667, 31.1833',
    'language': 'Arabic',
    'revisit-after': '3 days',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  restaurant: {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `/pizza-pepo/logo.webp`,
    image: ogImage,
    servesCuisine: ['Pizza', 'Italian', 'Fast Food'],
    priceRange: '$$',
    telephone: '+201065222155',
    email: 'info@pizzapepo.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'بنها',
      addressLocality: 'Benha',
      addressRegion: 'Qalyubia Governorate',
      postalCode: '13511',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.469944,
      longitude: 31.1819077,
    },
    areaServed: {
      '@type': 'City',
      name: 'Benha',
    },
    hasMenu: {
      '@type': 'Menu',
      name: 'Pizza Bebo Menu',
    },
    acceptsReservations: 'True',
    paymentAccepted: ['Cash', 'Credit Card', 'Mobile Payment'],
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
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: siteName,
    image: ogImage,
    '@id': siteUrl,
    url: siteUrl,
    telephone: '+201065222155',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'بنها',
      addressLocality: 'Benha',
      addressRegion: 'Qalyubia',
      postalCode: '13511',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.469944,
      longitude: 31.1819077,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '11:00',
        closes: '23:59',
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
        id="restaurant-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd.restaurant),
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
        id="local-business-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd.localBusiness),
        }}
      />

      {children}
    </>
  );
}