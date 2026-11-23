import type { Metadata } from "next";

import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
    title: "احصل على QR Code الخاص بك | أول ٣ شهور مجاناً",
    description: "اطلب صفحة QR احترافية لنشاطك وجرّبها أول ٣ شهور مجاناً. Get your own QR page, first 3 months free.",
};

type Props = { searchParams: Promise<{ ref?: string; lang?: string }> };

export default async function GetQrPage({ searchParams }: Props) {
    const { ref, lang } = await searchParams;
    return <SignupForm initialLanguage={lang === "en" ? "en" : "ar"} reference={ref ?? ""} />;
}
