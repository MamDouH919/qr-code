import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = 'https://test-qr.mountain-egy.site/';
const siteName = 'Mountain';
const siteTitle = 'Mountain - Digital Marketing Agency';
const siteDescription = "Mountain is a leading digital marketing agency specializing in SEO, social media marketing, content creation, PPC advertising, and brand strategy. We help businesses grow their online presence and achieve measurable results through data-driven marketing solutions.";
const siteKeywords = 'Mountain Agency, digital marketing agency, SEO services, social media marketing, content marketing, PPC advertising, brand strategy, online marketing, digital advertising, marketing agency, social media management, search engine optimization';
const ogImage = `/mountain/icon0.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'Mountain' }],
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
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  icons: {
    icon: '/mountain/favicon.ico',
    apple: '/mountain/apple-touch-icon.png',
  },
  other: {
    'language': 'English',
    'revisit-after': '7 days',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/mountain/logo.png`,
    },
    image: ogImage,
    telephone: '+1234567890',
    email: 'info@mountainagency.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Marketing Street',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: '12345',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.facebook.com/mountainagency',
      'https://www.instagram.com/mountainagency',
      'https://www.linkedin.com/company/mountainagency',
      'https://twitter.com/mountainagency',
    ],
  },
  service: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    serviceType: 'Digital Marketing Agency',
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Search Engine Optimization (SEO)',
            description: 'Comprehensive SEO services to improve search rankings',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Social Media Marketing',
            description: 'Strategic social media management and advertising',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Content Marketing',
            description: 'Engaging content creation and strategy',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pay-Per-Click Advertising',
            description: 'ROI-focused PPC campaign management',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brand Strategy',
            description: 'Comprehensive brand development and positioning',
          },
        },
      ],
    },
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
};

export default function RootLayout({
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
          __html: JSON.stringify(jsonLd.organization),
        }}
      />

      <Script
        id="service-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd.service),
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
      
      {children}
    </>
  );
}