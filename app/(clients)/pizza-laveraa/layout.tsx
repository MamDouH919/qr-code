import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
const siteName = 'Pizza Laveraa';
const siteTitle = 'بيتزا لافيرا - مطعم بيتزا وباستا إيطالي في بنها';
const siteDescription = "بيتزا لافيرا - مطعم بيتزا إيطالي في بنها، المنشية، القليوبية. نقدم جميع أنواع البيتزا والباستا الطازجة واللذيذة بأجود المكونات وأفضل الأسعار. مفتوح يومياً من 11 صباحاً حتى 4 فجراً مع توصيل سريع.";
const siteKeywords = 'بيتزا لافيرا, Pizza Laveraa, Lavera Pizza, مطعم بيتزا بنها, بيتزا المنشية, باستا بنها, بيتزا إيطالي بنها, بيتزا القليوبية, توصيل بيتزا بنها, مطاعم بنها, pizza delivery Benha, Italian pizza Benha, pasta Benha';
const ogImage = `/pizza-laveraa/logo.webp`;
const icon = '/pizza-laveraa/favicon.ico';

const latitude = 30.469944;
const longitude = 31.1819077;
const telephone = '+201120158161';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? ""),
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
    apple: '/pizza-laveraa/apple-icon.png',
  },
  other: {
    'geo.region': 'EG',
    'geo.placename': 'Benha, Qalyubia, Egypt',
    'geo.position': `${latitude};${longitude}`,
    'ICBM': `${latitude}, ${longitude}`,
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
    logo: ogImage,
    image: ogImage,
    servesCuisine: ['Pizza', 'Italian', 'Pasta', 'Fast Food'],
    priceRange: '$$',
    telephone: telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'المنشية، بنها',
      addressLocality: 'Benha',
      addressRegion: 'Qalyubia Governorate',
      postalCode: '13511',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: latitude,
      longitude: longitude,
    },
    areaServed: {
      '@type': 'City',
      name: 'Benha',
    },
    hasMenu: {
      '@type': 'Menu',
      name: 'Pizza Laveraa Menu',
    },
    acceptsReservations: 'True',
    paymentAccepted: ['Cash', 'Credit Card', 'Mobile Payment'],
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
        closes: '04:00',
      },
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
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: siteName,
    image: ogImage,
    '@id': siteUrl,
    url: siteUrl,
    telephone: telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'المنشية، بنها',
      addressLocality: 'Benha',
      addressRegion: 'Qalyubia',
      postalCode: '13511',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: latitude,
      longitude: longitude,
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
        closes: '04:00',
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
