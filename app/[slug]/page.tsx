import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ClientLanding from "@/components/ClientLanding";
import { fetchClientPage } from "@/lib/backend";

/**
 * Every client page managed in the dashboard. Older pages that still have their
 * own folder under app/(clients) take precedence over this route, so they keep
 * working until they are removed.
 */
type Props = { params: Promise<{ slug: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

function plainDescription(d: string | { ar?: string; en?: string }): string {
    const text = typeof d === "string" ? d : d?.ar || d?.en || "";
    return text.length > 200 ? `${text.slice(0, 197)}…` : text;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const data = await fetchClientPage(slug);
    if (!data) return { title: "Page not found", robots: { index: false } };

    const title = data.role ? `${data.name} | ${data.role}` : data.name;
    const description = plainDescription(data.description);
    const image = data.images.logo || undefined;
    const url = siteUrl ? new URL(`/${data.id}`, siteUrl).toString() : undefined;

    return {
        metadataBase: siteUrl ? new URL(siteUrl) : undefined,
        title,
        description,
        alternates: url ? { canonical: url } : undefined,
        icons: image ? { icon: image, apple: image } : undefined,
        openGraph: { type: "website", url, title, description, siteName: data.name, images: image ? [{ url: image, alt: data.name }] : [] },
        twitter: { card: "summary_large_image", title, description, images: image ? [image] : [] },
    };
}

export default async function ClientPage({ params }: Props) {
    const { slug } = await params;
    const data = await fetchClientPage(slug);
    if (!data) notFound();
    return <ClientLanding data={data} />;
}
