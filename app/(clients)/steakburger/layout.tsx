import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

const siteName = 'ستيك برجر';
const siteTitle = 'ستيك برجر - مطعم برجر في اليمن';
const siteDescription = 'ستيك برجر، أفضل مطعم برجر في اليمن. نقدم أشهى أنواع البرجر المشوي على الفحم مع البطاطس المقرمشة والمشروبات الطازجة. فرعنا في نادي الوحدة يقدم لك تجربة طعام لا تُنسى مع أجود أنواع اللحوم والمكونات الطازجة.';
const siteKeywords = 'ستيك برجر, مطعم برجر اليمن, برجر صنعاء, برجر نادي الوحدة, مطاعم اليمن, برجر مشوي, Steak Burger Yemen, best burger Yemen, burger restaurant';
const ogImage = `/steakburger/logo.webp`;

export const SteakBurgerMetaData: Metadata = {
  metadataBase: new URL(siteUrl ?? ""),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'ستيك برجر' }],
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
    locale: 'ar_YE',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  icons: {
    icon: '/steakburger/favicon.ico',
    apple: '/steakburger/apple-touch-icon.png',
  },
  other: {
    'geo.region': 'YE',
    'geo.placename': 'صنعاء، اليمن',
    'geo.position': '15.3694;44.1910',
    'ICBM': '15.3694, 44.1910',
    'language': 'Arabic',
    'revisit-after': '7 days',
  },
}

export const metadata: Metadata = SteakBurgerMetaData;

// JSON-LD Structured Data
export const SteakBurgerJsonLd = {
  restaurant: {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteName,
    alternateName: 'Steak Burger',
    description: siteDescription,
    url: siteUrl,
    logo: `/steakburger/logo.webp`,
    image: ogImage,
    telephone: ['+967771375555', '+967771372222'],
    email: 'info@steakburger.ye',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'فرع نادي الوحدة',
      addressLocality: 'صنعاء',
      addressRegion: 'صنعاء',
      addressCountry: 'YE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '15.3694',
      longitude: '44.1910',
    },
    hasMap: 'https://maps.app.goo.gl/w9RmhBkVz6BDfhqH7',
    servesCuisine: [
      'برجر',
      'وجبات سريعة',
      'طعام أمريكي',
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
        opens: '12:00',
        closes: '00:00',
      },
    ],
    paymentAccepted: 'نقدي، بطاقات ائتمان',
    currenciesAccepted: 'YER',
    areaServed: {
      '@type': 'City',
      name: 'صنعاء',
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
    telephone: '+967771375555',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'فرع نادي الوحدة',
      addressLocality: 'صنعاء',
      addressRegion: 'صنعاء',
      addressCountry: 'YE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 15.3694,
      longitude: 44.1910,
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
      opens: '12:00',
      closes: '00:00',
    },
    servesCuisine: 'Burger & Fast Food',
  },
  menu: {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'قائمة ستيك برجر',
    description: 'قائمة برجر وجبات سريعة',
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'البرجر',
        description: 'أشهى أنواع البرجر المشوي',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'ستيك برجر الكلاسيكي',
          },
          {
            '@type': 'MenuItem',
            name: 'تشيز برجر',
          },
          {
            '@type': 'MenuItem',
            name: 'دبل برجر',
          },
        ],
      },
      {
        '@type': 'MenuSection',
        name: 'الوجبات',
        description: 'وجبات كاملة مع البطاطس والمشروبات',
      },
      {
        '@type': 'MenuSection',
        name: 'المقبلات',
        description: 'بطاطس مقرمشة، أصابع الدجاج، أونيون رينجز',
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
          __html: JSON.stringify(SteakBurgerJsonLd.restaurant),
        }}
      />

      <Script
        id="breadcrumb-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SteakBurgerJsonLd.breadcrumb),
        }}
      />

      <Script
        id="local-business-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SteakBurgerJsonLd.localBusiness),
        }}
      />

      <Script
        id="menu-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SteakBurgerJsonLd.menu),
        }}
      />
      {children}
    </>
  );
}