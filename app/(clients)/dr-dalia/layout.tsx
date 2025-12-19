import { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = 'https://greengrowth-clinic.com/'; // Update with actual URL
const siteName = 'Green Growth Clinic';
const siteTitle = 'Green Growth - Your Child Health and Welfare is Here';
const siteDescription = "Green Growth Clinic, led by Prof. Dalia A. Abdulrahman, specializes in pediatric and neonatal care. Prof. Dalia has served as a senior consultant in major referral centers in Egypt and internationally, with extensive experience as head and director of pediatric and neonatal intensive care units in Saudi Arabia and Egypt.";
const siteKeywords = 'Green Growth Clinic, Dr. Dalia Abdulrahman, pediatric care Egypt, child health, neonatal care, pediatric intensive care, child welfare, children healthcare Egypt, pediatrician Egypt, NICU specialist, عيادة النمو الأخضر, دكتورة داليا عبدالرحمن, طب أطفال';
const ogImage = `/dr-dalia/logo.webp`;

export const GreenGrowthMetaData: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'Dr. Dalia A. Abdulrahman' }],
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
    locale: 'en-EG',
    alternateLocale: ['ar-EG'],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  icons: {
    icon: '/dr-dalia/favicon.ico',
    apple: '/dr-dalia/apple-touch-icon.png',
  },
  other: {
    'geo.region': 'EG',
    'geo.placename': 'Egypt',
    'geo.position': '30.0444;31.2357',
    'ICBM': '30.0444, 31.2357',
    'language': 'English',
    'revisit-after': '7 days',
  },
}

export const metadata: Metadata = GreenGrowthMetaData;

// JSON-LD Structured Data
export const GreenGrowthJsonLd = {
  medicalClinic: {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `/dr-dalia/logo.webp`,
    image: ogImage,
    telephone: '+20XXXXXXXXXX', // Add actual phone number
    email: 'drdalia2811@gmail.com', // Add actual email
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address', // Add actual address
      addressLocality: 'Your City',
      addressRegion: 'Your Governorate',
      addressCountry: 'EG',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Egypt',
    },
    medicalSpecialty: [
      'Pediatrics',
      'Neonatology',
      'PediatricIntensiveCare',
      'NeonatalIntensiveCare',
    ],
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Pediatric Care',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Neonatal Care',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Pediatric Intensive Care',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Child Health and Welfare Services',
      },
    ],
  },
  physician: {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Prof. Dalia A. Abdulrahman',
    honorificPrefix: 'Prof.',
    jobTitle: 'Senior Pediatric Consultant & Director of Pediatric and Neonatal ICU',
    description: 'Prof. Dalia worked as a senior consultant in many big referral centres in and outside Egypt. She has the position of the head and director of pediatric and neonatal intensive care units in Saudi Arabia and Egypt.',
    worksFor: {
      '@type': 'MedicalClinic',
      name: siteName,
    },
    medicalSpecialty: [
      'Pediatrics',
      'Neonatology',
      'PediatricIntensiveCare',
    ],
    alumniOf: 'Medical Institution', // Add actual university/institution
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
          __html: JSON.stringify(GreenGrowthJsonLd.medicalClinic),
        }}
      />

      <Script
        id="physician-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(GreenGrowthJsonLd.physician),
        }}
      />

      <Script
        id="breadcrumb-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(GreenGrowthJsonLd.breadcrumb),
        }}
      />
      
      {children}
    </>
  );
}