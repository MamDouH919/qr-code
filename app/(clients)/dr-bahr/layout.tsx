import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
const folderName = "dr-bahr"

const siteName = 'د. باهر النجار';
const siteTitle = 'د. باهر النجار - طبيب أسنان تقويم';
const siteDescription = "عيادة د. باهر النجار لتقويم الأسنان، متخصصون في تقويم الأسنان بأحدث التقنيات. فرع الشيخ زايد - كاجو مول. احجز موعدك الآن.";
const siteKeywords = 'د. باهر النجار, طبيب أسنان, تقويم أسنان, دكتور تقويم الشيخ زايد, دكتور اسنان الجيزة, تقويم أسنان الشيخ زايد, كاجو مول, Dr Bahr El-Najjar, orthodontist Egypt';
const ogImage = `/${folderName}/logo.webp`;

export const DrBahrMetaData: Metadata = {
  metadataBase: new URL(siteUrl ?? ""),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'د. باهر النجار' }],
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
    icon: `/${folderName}/favicon.ico`,
    apple: `/${folderName}/apple-icon.png`,
  },
  other: {
    'geo.region': 'EG',
    'geo.placename': 'الجيزة، مصر',
    'geo.position': '30.0311895;30.9928282',
    'ICBM': '30.0311895, 30.9928282',
    'language': 'Arabic',
    'revisit-after': '7 days',
  },
}
export const metadata: Metadata = DrBahrMetaData;

// JSON-LD Structured Data
export const DrBahrJsonLd = {
  dentist: {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `/${folderName}/logo.webp`,
    image: ogImage,
    telephone: '+201009378216',
    priceRange: '$$',
    paymentAccepted: 'نقدي',
    currenciesAccepted: 'EGP',
    areaServed: [
      {
        '@type': 'City',
        name: 'الشيخ زايد',
      },
      {
        '@type': 'State',
        name: 'الجيزة',
      },
    ],
    medicalSpecialty: 'تقويم الأسنان',
  },
  sheikhZayedLocation: {
    '@context': 'https://schema.org',
    '@type': 'DentalClinic',
    name: 'عيادة د. باهر النجار - الشيخ زايد كاجو مول',
    parentOrganization: {
      '@type': 'Dentist',
      name: siteName,
    },
    url: siteUrl,
    image: ogImage,
    telephone: '+201009378216',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'كاجو مول، الشيخ زايد',
      addressLocality: 'الشيخ زايد',
      addressRegion: 'الجيزة',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '30.0311895',
      longitude: '30.9928282',
    },
    hasMap: 'https://www.google.com/maps?q=30.0311895,30.9928282',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Saturday',
          'Tuesday',
          'Thursday',
        ],
        opens: '17:00',
        closes: '21:00',
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
        name: 'الرئيسية',
        item: siteUrl,
      },
    ],
  },
  medicalServices: {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: siteName,
    medicalSpecialty: [
      'تقويم الأسنان',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات تقويم الأسنان',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'تقويم الأسنان',
          },
        },
      ],
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
        id="dentist-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(DrBahrJsonLd.dentist),
        }}
      />

      <Script
        id="sheikh-zayed-location-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(DrBahrJsonLd.sheikhZayedLocation),
        }}
      />

      <Script
        id="breadcrumb-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(DrBahrJsonLd.breadcrumb),
        }}
      />

      <Script
        id="medical-services-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(DrBahrJsonLd.medicalServices),
        }}
      />
      {children}
    </>
  );
}