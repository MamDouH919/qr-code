import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

const siteName = 'شعبيات زاد';
const siteTitle = 'شعبيات زاد - مطعم طعام شعبي في تبوك';
const siteDescription = 'شعبيات زاد، مطعم طعام سريع يقدم الطعم الأصلي للأكل الشعبي السعودي. استمتع بأشهى المأكولات الشعبية والتقليدية في تبوك. نقدم وجبات سريعة بجودة عالية ونكهة أصيلة.';
const siteKeywords = 'شعبيات زاد, مطعم شعبي تبوك, أكل شعبي, طعام سريع تبوك, مطاعم تبوك, أكل سعودي, مطاعم الفيصلية, كبسة, مندي, مطازيز, جريش, Shaebiaat Zad, Saudi food Tabuk';
const ogImage = `/shaebiaat-zad/logo.webp`;

export const ShaebiiatZadMetaData: Metadata = {
  metadataBase: new URL(siteUrl ?? ""),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'شعبيات زاد' }],
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
    locale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  icons: {
    icon: '/shaebiaat-zad/favicon.ico',
    apple: '/shaebiaat-zad/apple-icon.png',
  },
  other: {
    'geo.region': 'SA-08',
    'geo.placename': 'تبوك، المملكة العربية السعودية',
    'geo.position': '28.3838;36.5550',
    'ICBM': '28.3838, 36.5550',
    'language': 'Arabic',
    'revisit-after': '7 days',
  },
}

export const metadata: Metadata = ShaebiiatZadMetaData;

// JSON-LD Structured Data
export const ShaebiiatZadJsonLd = {
  restaurant: {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `/shaebiaat-zad/logo.webp`,
    image: ogImage,
    telephone: '+966XXXXXXXXX',
    email: 'info@shaebiaat-zad.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3474 طريق الملك عبدالعزيز، الفيصلية الجنوبية',
      addressLocality: 'تبوك',
      addressRegion: 'تبوك',
      postalCode: '47911',
      addressCountry: 'SA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.3838',
      longitude: '36.5550',
    },
    servesCuisine: [
      'أكل شعبي سعودي',
      'طعام سريع',
      'أكل تقليدي',
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
        closes: '00:00',
      },
    ],
    paymentAccepted: 'نقدي، بطاقات ائتمان، مدى، Apple Pay',
    currenciesAccepted: 'SAR',
    areaServed: {
      '@type': 'City',
      name: 'تبوك',
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
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'FastFoodRestaurant',
    name: siteName,
    image: ogImage,
    '@id': siteUrl,
    url: siteUrl,
    telephone: '+966XXXXXXXXX',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3474 طريق الملك عبدالعزيز، الفيصلية الجنوبية',
      addressLocality: 'تبوك',
      addressRegion: 'تبوك',
      postalCode: '47911',
      addressCountry: 'SA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.3838,
      longitude: 36.5550,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '08:00',
      closes: '00:00',
    },
    servesCuisine: 'Saudi Traditional Food',
  },
  menu: {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'قائمة شعبيات زاد',
    description: 'الطعم الأصلي للأكل الشعبي',
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'الأطباق الشعبية',
        description: 'أشهى المأكولات الشعبية السعودية',
      },
      {
        '@type': 'MenuSection',
        name: 'وجبات سريعة',
        description: 'وجبات سريعة بنكهة أصيلة',
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
        id="restaurant-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ShaebiiatZadJsonLd.restaurant),
        }}
      />

      <Script
        id="breadcrumb-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ShaebiiatZadJsonLd.breadcrumb),
        }}
      />

      <Script
        id="local-business-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ShaebiiatZadJsonLd.localBusiness),
        }}
      />

      <Script
        id="menu-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ShaebiiatZadJsonLd.menu),
        }}
      />
      {children}
    </>
  );
}