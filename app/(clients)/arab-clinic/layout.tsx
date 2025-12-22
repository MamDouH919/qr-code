import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
const siteName = 'Arab Clinic';
const siteTitle = 'Arab Clinic - Medical Center';
const siteDescription = "Arab Clinic Center, established in 2018, is one of Egypt's premier healthcare providers with branches in Qalyubia, Obour City, Shebin El Qanater, and Meet Ghamr. We offer exceptional medical care across all specialties with highly qualified doctors and state-of-the-art facilities.";
const siteKeywords = 'Arab Clinic, medical center Egypt, healthcare Qalyubia, Abu Zaabal clinic, Obour City hospital, Shebin El Qanater medical center, Meet Ghamr clinic, Egyptian healthcare, medical specialists Egypt, quality healthcare, عيادة العرب, مركز طبي مصر';
const ogImage = `/arab-clinic/logo.webp`;

export const ArabClinicMetaData: Metadata = {
  metadataBase: new URL(siteUrl ?? ""),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'Arab Clinic' }],
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
    icon: '/arab-clinic/favicon.ico',
    apple: '/arab-clinic/apple-touch-icon.png',
  },
  other: {
    'geo.region': 'EG',
    'geo.placename': 'Qalyubia, Egypt',
    'geo.position': '30.2672;31.3647',
    'ICBM': '30.2672, 31.3647',
    'language': 'English',
    'revisit-after': '7 days',
  },
}
export const metadata: Metadata = ArabClinicMetaData;

// JSON-LD Structured Data
export const ArabClinicJsonLd = {
  medicalClinic: {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `/arab-clinic/logo.webp`,
    image: ogImage,
    foundingDate: '2018',
    telephone: '+201550141552',
    email: 'info@arabclinic.com',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Abu Zaabal',
        addressLocality: 'Abu Zaabal',
        addressRegion: 'Qalyubia Governorate',
        addressCountry: 'EG',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Obour City',
        addressLocality: 'Obour City',
        addressRegion: 'Qalyubia Governorate',
        addressCountry: 'EG',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Shebin El Qanater',
        addressLocality: 'Shebin El Qanater',
        addressRegion: 'Qalyubia Governorate',
        addressCountry: 'EG',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Meet Ghamr',
        addressLocality: 'Meet Ghamr',
        addressRegion: 'Dakahlia Governorate',
        addressCountry: 'EG',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Egypt',
    },
    medicalSpecialty: [
      'GeneralPractice',
      'Surgery',
      'Pediatrics',
      'Cardiology',
      'Dermatology',
      'Orthopedics',
      'Gynecology',
      'InternalMedicine',
    ],
    availableService: {
      '@type': 'MedicalProcedure',
      name: 'Comprehensive Medical Services',
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

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="medical-clinic-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ArabClinicJsonLd.medicalClinic),
        }}
      />

      <Script
        id="breadcrumb-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ArabClinicJsonLd.breadcrumb),
        }}
      />
      {children}
    </>

  );
}