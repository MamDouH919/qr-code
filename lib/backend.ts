import { isValidSlug } from "@/lib/visitors";

/**
 * Client page data as served by qr-backend (GET /public/clients/:slug).
 * Server-side code only — the browser never talks to the backend directly.
 */
export type BackendAd = {
    id: string;
    title: string;
    description: string;
    badge: string;
    image: string;
    /** Non-empty when the ad has a link. The real target is only resolved server-side, by /api/ads/:id/go. */
    ctaLink: string;
    validUntil: string | null;
};

export type BackendBranch = {
    branchName: { ar: string; en: string };
    numbers: { number: string; type: string[] }[];
    location: string;
};

export type BackendClient = {
    id: string;
    active: boolean;
    name: string;
    subName: string;
    role: string;
    description: string | { ar?: string; en?: string };
    color: string;
    secondColor: string;
    countryCode: string;
    multiLanguage: boolean;
    socials: { code: string; link: string }[];
    branches: BackendBranch[];
    apps: { ios?: string; android?: string };
    whatsAppGroup: string;
    galleries: { title: string; images: string[] }[];
    images: { logo: string; background: string; profileImage: string };
    ads: BackendAd[];
    /** Anything page-specific the dashboard stored under "Advanced". */
    autoReplyWhatsapp?: string;
    [extra: string]: unknown;
};

export const backendUrl = () => (process.env.QR_API_URL ?? "").replace(/\/$/, "");

/** Fetch a page. Returns null when the slug is unknown or inactive; throws if the backend is unreachable. */
export async function fetchClientPage(slug: string): Promise<BackendClient | null> {
    if (!isValidSlug(slug)) return null;
    const base = backendUrl();
    if (!base) throw new Error("QR_API_URL is not set");

    const res = await fetch(`${base}/public/clients/${encodeURIComponent(slug)}`, {
        // Short cache: dashboard edits show up within a minute, and the backend is not hit per visitor.
        next: { revalidate: 30, tags: [`client:${slug}`] },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Backend responded ${res.status}`);
    return res.json();
}

export type BackendClientSummary = { id: string; name: string; src: string };

/** Active clients (name and logo) for the customers strip. Returns null when the backend is unavailable. */
export async function fetchClientList(): Promise<BackendClientSummary[] | null> {
    const base = backendUrl();
    if (!base) return null;

    try {
        const res = await fetch(`${base}/public/clients`, {
            next: { revalidate: 30, tags: ["clients"] },
            signal: AbortSignal.timeout(3000),
        });
        if (!res.ok) return null;
        const data = await res.json();
        // A client without a logo has nothing to show in the strip, and an empty image src is invalid.
        return Array.isArray(data) ? data.filter((client: BackendClientSummary) => !!client.src) : null;
    } catch {
        return null;
    }
}
