import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

const siteName = 'د. محمد لاشين';
const siteTitle = 'د. محمد لاشين - طبيب أسنان';
const siteDescription = "عيادة د. محمد لاشين لطب الأسنان، نقدم خدمات متكاملة لصحة الفم والأسنان بأحدث التقنيات. علاج وتجميل الأسنان، زراعة، تقويم، تبييض، وحشو الأسنان. فرعين في ناهيا وقليوب للخدمة الأفضل. احجز موعدك الآن.";
const siteKeywords = 'د. محمد لاشين, طبيب أسنان, عيادة أسنان, دكتور اسنان القليوبية, دكتور اسنان ناهيا, دكتور اسنان قليوب, زراعة أسنان, تقويم أسنان, تبييض أسنان, حشو أسنان, علاج جذور, تجميل أسنان, Dr Mohamed Lashin, dentist Egypt';
const ogImage = `/mohamed-lashen/logo.webp`;

export const DrLashinMetaData: Metadata = {
  metadataBase: new URL(siteUrl ?? ""),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'د. محمد لاشين' }],
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
    icon: '/mohamed-lashen/favicon.ico',
    apple: '/mohamed-lashen/apple-icon.png',
  },
  other: {
    'geo.region': 'EG',
    'geo.placename': 'القليوبية، مصر',
    'geo.position': '30.181331;31.204393',
    'ICBM': '30.181331, 31.204393',
    'language': 'Arabic',
    'revisit-after': '7 days',
  },
}
export const metadata: Metadata = DrLashinMetaData;

// JSON-LD Structured Data
export const DrLashinJsonLd = {
  dentist: {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `/dr-lashin/logo.webp`,
    image: ogImage,
    telephone: '+201XXXXXXXXX',
    email: 'info@dr-lashin.com',
    priceRange: '$$',
    paymentAccepted: 'نقدي، بطاقات ائتمان، فيزا، تقسيط',
    currenciesAccepted: 'EGP',
    areaServed: [
      {
        '@type': 'City',
        name: 'ناهيا',
      },
      {
        '@type': 'City',
        name: 'قليوب',
      },
      {
        '@type': 'State',
        name: 'القليوبية',
      },
    ],
    medicalSpecialty: 'طب الأسنان',
  },
  // فرع ناهيا
  nahiaLocation: {
    '@context': 'https://schema.org',
    '@type': 'DentalClinic',
    name: 'عيادة د. محمد لاشين - فرع ناهيا',
    parentOrganization: {
      '@type': 'Dentist',
      name: siteName,
    },
    url: siteUrl + 'locations/nahia',
    image: ogImage,
    telephone: '+201117513029',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ناهيا',
      addressLocality: 'ناهيا',
      addressRegion: 'القليوبية',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '30.181331',
      longitude: '31.204393',
    },
    hasMap: 'https://maps.app.goo.gl/kFjcDz6iu9MsMxYKA',
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
        opens: '10:00',
        closes: '22:00',
      },
    ],
  },
  // فرع قليوب
  qalyubLocation: {
    '@context': 'https://schema.org',
    '@type': 'DentalClinic',
    name: 'عيادة د. محمد لاشين - فرع قليوب',
    parentOrganization: {
      '@type': 'Dentist',
      name: siteName,
    },
    url: siteUrl + 'locations/qalyub',
    image: ogImage,
    telephone: '+201061854248',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'قليوب',
      addressLocality: 'قليوب',
      addressRegion: 'القليوبية',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '30.181331',
      longitude: '31.204393',
    },
    hasMap: 'https://www.google.com/maps?q=30.181331634521484,31.20439338684082',
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
        opens: '10:00',
        closes: '22:00',
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
      'طب الأسنان العام',
      'زراعة الأسنان',
      'تقويم الأسنان',
      'تجميل الأسنان',
      'علاج الجذور',
      'جراحة الفم',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات طب الأسنان',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'زراعة الأسنان',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'تقويم الأسنان',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'تبييض الأسنان',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'حشو وعلاج الأسنان',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'علاج جذور الأسنان',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'تركيبات الأسنان',
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
          __html: JSON.stringify(DrLashinJsonLd.dentist),
        }}
      />

      <Script
        id="nahia-location-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(DrLashinJsonLd.nahiaLocation),
        }}
      />

      <Script
        id="qalyub-location-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(DrLashinJsonLd.qalyubLocation),
        }}
      />

      <Script
        id="breadcrumb-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(DrLashinJsonLd.breadcrumb),
        }}
      />

      <Script
        id="medical-services-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(DrLashinJsonLd.medicalServices),
        }}
      />
      {children}
    </>
  );
}