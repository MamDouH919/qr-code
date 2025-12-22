import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

const siteName = '3baky';
const siteTitle = '3baky - تأجير سيارات في مصر';
const siteDescription = "3baky، أفضل خدمة تأجير سيارات في القليوبية ومصر. نوفر سيارات حديثة ومتنوعة بأسعار تنافسية وخدمة عملاء ممتازة. احجز سيارتك اليوم واستمتع بتجربة قيادة مريحة وآمنة مع أسطول متنوع من السيارات الاقتصادية والعائلية والفاخرة.";
const siteKeywords = '3baky, تأجير سيارات, إيجار سيارات مصر, تأجير سيارات القليوبية, حجز سيارة, rent a car Egypt, car rental, سيارات للإيجار, إيجار سيارات يومي, تأجير سيارات شهري, 3baky';
const ogImage = `/3baky/logo.webp`;

export const ThreebakyMetaData: Metadata = {
  metadataBase: new URL(siteUrl ?? ""),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: '3baky' }],
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
    icon: '/3baky/favicon.ico',
    apple: '/3baky/apple-touch-icon.png',
  },
  other: {
    'geo.region': 'EG',
    'geo.placename': 'القليوبية، مصر',
    'geo.position': '30.1792;31.2056',
    'ICBM': '30.1792, 31.2056',
    'language': 'Arabic',
    'revisit-after': '7 days',
  },
}
export const metadata: Metadata = ThreebakyMetaData;

// JSON-LD Structured Data
export const ThreebakyJsonLd = {
  carRental: {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `/3baky/logo.webp`,
    image: ogImage,
    telephone: '+201270328047',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'شارع الرئيسي',
      addressLocality: 'القليوبية',
      addressRegion: 'القليوبية',
      addressCountry: 'EG',
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'القليوبية',
      },
      {
        '@type': 'Country',
        name: 'مصر',
      },
    ],
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'السبت',
          'الأحد',
          'الإثنين',
          'الثلاثاء',
          'الأربعاء',
          'الخميس',
          'الجمعة',
        ],
        opens: '08:00',
        closes: '22:00',
      },
    ],
    paymentAccepted: 'نقدي، بطاقات ائتمان، تحويل بنكي',
    currenciesAccepted: 'EGP',
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
  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'تأجير سيارات',
    provider: {
      '@type': 'AutoRental',
      name: siteName,
    },
    areaServed: {
      '@type': 'Country',
      name: 'مصر',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات تأجير السيارات',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'تأجير يومي',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'تأجير أسبوعي',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'تأجير شهري',
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
        id="car-rental-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ThreebakyJsonLd.carRental),
        }}
      />

      <Script
        id="breadcrumb-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ThreebakyJsonLd.breadcrumb),
        }}
      />

      <Script
        id="service-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ThreebakyJsonLd.service),
        }}
      />
      {children}
    </>
  );
}