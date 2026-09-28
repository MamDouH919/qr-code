import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
const siteName = 'OSA';
const siteTitle = 'OSA - متجر النظارات والعدسات اللاصقة';
const siteDescription = "OSA هو متجرك الإلكتروني الأول لبيع النظارات الطبية والشمسية والعدسات اللاصقة في مصر. نقدم أفضل الماركات العالمية بأسعار تنافسية مع خدمة توصيل سريعة لجميع المحافظات. تسوق الآن واحصل على أفضل العروض على النظارات والعدسات.";
const siteKeywords = 'OSA, نظارات طبية, نظارات شمسية, عدسات لاصقة, متجر نظارات مصر, نظارات أون لاين, عدسات طبية, نظارات رجالي, نظارات حريمي, eyeglasses Egypt, sunglasses, contact lenses, optical store, OSA Egypt';
const ogImage = `/osa/logo.webp`;

export const OSAMetaData: Metadata = {
  metadataBase: new URL(siteUrl ?? ""),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'OSA' }],
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
      'en': `${siteUrl}/en`,
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
    icon: '/osa/favicon.ico',
    apple: '/osa/apple-icon.png',
  },
  other: {
    'geo.region': 'EG',
    'geo.placename': 'Cairo, Egypt',
    'geo.position': '30.0444;31.2357',
    'ICBM': '30.0444, 31.2357',
    'language': 'Arabic',
    'revisit-after': '7 days',
  },
}
export const metadata: Metadata = OSAMetaData;

// JSON-LD Structured Data
export const OSAJsonLd = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': siteUrl,
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `/osa/logo.webp`,
    image: ogImage,
    telephone: '+201124525753',
    email: 'info@osa-eyewear.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cairo',
      addressLocality: 'Cairo',
      addressRegion: 'Cairo Governorate',
      addressCountry: 'EG',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Egypt',
    },
    currenciesAccepted: 'EGP',
    paymentAccepted: 'Cash, Credit Card, Debit Card, Online Payment',
    priceRange: '$$',
  },
  webSite: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  product: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'نظارات وعدسات لاصقة',
    description: 'مجموعة واسعة من النظارات الطبية والشمسية والعدسات اللاصقة',
    brand: {
      '@type': 'Brand',
      name: siteName,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EGP',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: siteName,
      },
    },
    category: 'نظارات وعدسات',
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
        id="organization-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(OSAJsonLd.organization),
        }}
      />

      <Script
        id="website-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(OSAJsonLd.webSite),
        }}
      />

      <Script
        id="product-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(OSAJsonLd.product),
        }}
      />

      <Script
        id="breadcrumb-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(OSAJsonLd.breadcrumb),
        }}
      />
      {children}
    </>

  );
}