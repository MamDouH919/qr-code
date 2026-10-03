"use client";

import { useEffect, useRef } from "react";

import Ad from "@/components/Ad";
import type { BackendAd } from "@/lib/backend";

/**
 * One ad on a client page. Counts a view the first time at least half the banner
 * is on screen (the backend keeps it to once per visitor per day), and links
 * through /api/ads/:id/go so the click is counted before the redirect.
 */
export default function AdSlot({ ad }: { ad: BackendAd }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node || typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((e) => e.isIntersecting)) return;
                observer.disconnect();
                fetch(`/api/ads/${ad.id}/impression`, { method: "POST" }).catch(() => undefined);
            },
            { threshold: 0.5 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [ad.id]);

    return (
        <div ref={ref}>
            <Ad
                title={ad.title}
                description={ad.description || undefined}
                badge={ad.badge || undefined}
                image={ad.image || undefined}
                ctaLink={ad.ctaLink ? `/api/ads/${ad.id}/go` : undefined}
                validUntil={ad.validUntil ?? undefined}
            />
        </div>
    );
}
