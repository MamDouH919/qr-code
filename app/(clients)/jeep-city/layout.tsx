import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = 'https://jeep-city.example.com/';
const siteName = 'جيب سيتي';
const siteTitle = 'جيب سيتي - مركز صيانة سيارات جيب';
const siteDescription = "جيب سيتي، مركز متخصص في صيانة وإصلاح سيارات الجيب بجميع أنواعها. نقدم خدمات صيانة احترافية بأعلى جودة وأحدث المعدات في القاهرة الجديدة - مدينة الرحاب. فريق عمل متخصص وقطع غيار أصلية لضمان أفضل أداء لسيارتك.";
const siteKeywords = 'جيب سيتي, صيانة جيب, إصلاح سيارات جيب, مركز صيانة سيارات, جيب رانجلر, جيب شيروكي, جيب كومباس, صيانة سيارات القاهرة الجديدة, ورشة جيب, قطع غيار جيب, الرحاب, Jeep City, Jeep maintenance Egypt';
const ogImage = `/jeep-city/logo.webp`;

export const JeepCityMetaData: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'جيب سيتي' }],
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
    icon: '/jeep-city/favicon.ico',
    apple: '/jeep-city/apple-touch-icon.png',
  },
  other: {
    'geo.region': 'EG',
    'geo.placename': 'القاهرة الجديدة، مصر',
    'geo.position': '30.0594;31.4975',
    'ICBM': '30.0594, 31.4975',
    'language': 'Arabic',
    'revisit-after': '7 days',
  },
}
export const metadata: Metadata = JeepCityMetaData;

// JSON-LD Structured Data
export const JeepCityJsonLd = {
  autoRepair: {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `/jeep-city/logo.webp`,
    image: ogImage,
    telephone: '+201XXXXXXXXX',
    email: 'info@jeepcity.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'السوق الشرقى',
      addressLocality: 'مدينة الرحاب',
      addressRegion: 'القاهرة الجديدة',
      addressCountry: 'EG',
    },
    areaServed: {
      '@type': 'Country',
      name: 'مصر',
    },
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
        ],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    paymentAccepted: 'نقدي، بطاقات ائتمان',
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
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="auto-repair-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JeepCityJsonLd.autoRepair),
        }}
      />

      <Script
        id="breadcrumb-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JeepCityJsonLd.breadcrumb),
        }}
      />
      {children}
    </>
  );
}