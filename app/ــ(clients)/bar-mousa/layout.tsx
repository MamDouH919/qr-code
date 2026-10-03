import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
const siteName = 'بار موسى';
const siteTitle = 'بار موسى - مجمع مطاعم وكافيهات في بنها';
const siteDescription = "بار موسى - أفضل مجمع مطاعم وكافيهات في بنها، القليوبية. نقدم تجربة طعام فريدة مع أجود المأكولات والمشروبات في أجواء راقية ومريحة. فرع بنها يقدم لك خيارات متنوعة من المطاعم والكافيهات تحت سقف واحد.";
const siteKeywords = 'بار موسى, Bar Musa, مجمع مطاعم بنها, كافيهات بنها, مطاعم القليوبية, مقاهي بنها, أفضل مطاعم بنها, كافيه بنها, restaurants Benha, cafes Benha, food court Benha';
const ogImage = `/bar-mousa/logo.webp`;
const icon = '/bar-mousa/favicon.ico';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? ""),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'بار موسى' }],
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
    apple: '/bar-mousa/apple-icon.png',
  },
  other: {
    'geo.region': 'EG',
    'geo.placename': 'بنها، القليوبية، مصر',
    'geo.position': '30.4567;31.1875',
    'ICBM': '30.4567, 31.1875',
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
    alternateName: 'Bar Musa',
    description: siteDescription,
    url: siteUrl,
    logo: `/bar-mousa/logo.webp`,
    image: ogImage,
    servesCuisine: ['مأكولات متنوعة', 'كافيه', 'مطعم'],
    priceRange: '$$',
    telephone: '+201014939291',
    email: 'info@barmusa.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'فرع بنها',
      addressLocality: 'بنها',
      addressRegion: 'القليوبية',
      postalCode: '13511',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '30.4567',
      longitude: '31.1875',
    },
    hasMap: 'https://www.google.com/maps/dir/30.4676864,31.1820288/30.4566989,31.1874951/@30.461266,31.1725973,15z/data=!3m1!4b1!4m4!4m3!1m1!4e1!1m0?entry=ttu&g_ep=EgoyMDI0MTExMi4wIKXMDSoASAFQAw%3D%3D',
    areaServed: {
      '@type': 'City',
      name: 'بنها',
    },
    hasMenu: {
      '@type': 'Menu',
      name: 'قائمة بار موسى',
    },
    acceptsReservations: 'True',
    paymentAccepted: ['نقدي', 'بطاقات ائتمان', 'محافظ إلكترونية'],
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'مطاعم متعددة',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'كافيهات',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'جلسات عائلية',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'واي فاي مجاني',
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
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: siteName,
    image: ogImage,
    '@id': siteUrl,
    url: siteUrl,
    telephone: '+201014939291',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'فرع بنها',
      addressLocality: 'بنها',
      addressRegion: 'القليوبية',
      postalCode: '13511',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.4567,
      longitude: 31.1875,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'الإثنين',
          'الثلاثاء',
          'الأربعاء',
          'الخميس',
          'الجمعة',
          'السبت',
          'الأحد',
        ],
        opens: '10:00',
        closes: '02:00',
      },
    ],
  },
  shoppingCenter: {
    '@context': 'https://schema.org',
    '@type': 'ShoppingCenter',
    name: siteName,
    description: 'مجمع مطاعم وكافيهات في بنها',
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'فرع بنها',
      addressLocality: 'بنها',
      addressRegion: 'القليوبية',
      addressCountry: 'EG',
    },
    containsPlace: [
      {
        '@type': 'Restaurant',
        name: 'مطاعم بار موسى',
      },
      {
        '@type': 'CafeOrCoffeeShop',
        name: 'كافيهات بار موسى',
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

      <Script
        id="shopping-center-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd.shoppingCenter),
        }}
      />

      {children}
    </>
  );
}