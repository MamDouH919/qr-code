import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

const siteName = 'Elite Bridge';
const siteTitle = 'Elite Bridge - Business Services in UAE';
const siteDescription = 'Elite Bridge provides comprehensive business services in the UAE, including Amer, Tasheel, Tawjeeh, and Dubai Economy support. Professional solutions for companies of all sizes.';
const siteKeywords = 'Elite Bridge, Amer services, Tasheel services, Tawjeeh, Dubai Economy, business setup UAE, company registration UAE, business support UAE';
const ogImage = `/elite-bridge/logo.webp`;

export const EliteBridgeMetaData: Metadata = {
  metadataBase: new URL(siteUrl ?? ""),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'Elite Bridge' }],
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
        alt: siteName,
      },
    ],
    locale: 'en_AE',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  icons: {
    icon: '/elite-bridge/favicon.ico',
    apple: '/elite-bridge/apple-touch-icon.png',
  },
  other: {
    'geo.region': 'AE-DU',
    'geo.placename': 'Dubai, United Arab Emirates',
    'geo.position': '25.2048;55.2708',
    'ICBM': '25.2048, 55.2708',
    'language': 'English',
    'revisit-after': '7 days',
  },
}

export const metadata: Metadata = EliteBridgeMetaData;

// JSON-LD Structured Data
export const EliteBridgeJsonLd = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `/elite-bridge/logo.webp`,
    image: ogImage,
    telephone: '+971XXXXXXXXX',
    email: 'info@elitebridge.ae',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dubai',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.2048',
      longitude: '55.2708',
    },
    hasMap: 'https://maps.app.goo.gl/e9ZJ4xcQZY3nQwuz5',
    areaServed: [
      {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
      {
        '@type': 'City',
        name: 'Dubai',
      },
      {
        '@type': 'City',
        name: 'Abu Dhabi',
      },
      {
        '@type': 'City',
        name: 'Sharjah',
      },
    ],
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
        ],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    currenciesAccepted: 'AED',
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
  services: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Business Support Services',
    provider: {
      '@type': 'ProfessionalService',
      name: siteName,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Arab Emirates',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Business Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Amer Services',
            description: 'Comprehensive Amer services for businesses and individuals',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tasheel Services',
            description: 'Government transaction facilitation services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tawjeeh Services',
            description: 'Business guidance and consultation services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Dubai Economy Support',
            description: 'Dubai Economy department support and services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Company Formation',
            description: 'Company setup and registration services in UAE',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Administration Support',
            description: 'Comprehensive administrative solutions for companies',
          },
        },
      ],
    },
  },
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteName,
    image: ogImage,
    '@id': siteUrl,
    url: siteUrl,
    telephone: '+971XXXXXXXXX',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dubai',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      postalCode: '',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.2048,
      longitude: 55.2708,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
      ],
      opens: '08:00',
      closes: '18:00',
    },
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
          __html: JSON.stringify(EliteBridgeJsonLd.organization),
        }}
      />

      <Script
        id="breadcrumb-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(EliteBridgeJsonLd.breadcrumb),
        }}
      />

      <Script
        id="services-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(EliteBridgeJsonLd.services),
        }}
      />

      <Script
        id="local-business-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(EliteBridgeJsonLd.localBusiness),
        }}
      />
      {children}
    </>
  );
}