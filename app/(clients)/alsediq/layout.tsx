import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
const folderName = "alsediq"

const siteName = 'الصديق للبصريات';
const siteTitle = 'الصديق للبصريات - Al-Sediq Optics';
const siteDescription = "الصديق للبصريات - متخصصون في النظارات الطبية والشمسية والعدسات اللاصقة. اختار نظارتك وشوف شكلها عليك قبل الشراء. أفضل الماركات العالمية بأسعار تنافسية.";
const siteKeywords = 'الصديق للبصريات, Al-Sediq Optics, نظارات طبية, نظارات شمسية, عدسات لاصقة, بصريات, محل نظارات, نظارات أون لاين, عدسات طبية, eyeglasses Egypt, sunglasses, contact lenses, optical store';
const ogImage = `/${folderName}/logo.webp`;

export const AlSediqMetaData: Metadata = {
  metadataBase: new URL(siteUrl ?? ""),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'الصديق للبصريات' }],
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
    'geo.placename': 'مصر',
    'language': 'Arabic',
    'revisit-after': '7 days',
  },
}
export const metadata: Metadata = AlSediqMetaData;

// JSON-LD Structured Data
export const AlSediqJsonLd = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': siteUrl,
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `/${folderName}/logo.webp`,
    image: ogImage,
    telephone: '+201124525753',
    areaServed: {
      '@type': 'Country',
      name: 'Egypt',
    },
    currenciesAccepted: 'EGP',
    paymentAccepted: 'نقدي، بطاقات ائتمان',
    priceRange: '$$',
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
          __html: JSON.stringify(AlSediqJsonLd.organization),
        }}
      />

      <Script
        id="breadcrumb-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(AlSediqJsonLd.breadcrumb),
        }}
      />
      {children}
    </>
  );
}
