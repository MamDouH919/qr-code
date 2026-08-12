"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { resolveSlug } from "@/lib/visitors";

/**
 * One request per slug per tab, shared by every mount.
 *
 * This lives outside the component on purpose: React StrictMode mounts effects
 * twice in development, and a sessionStorage check alone doesn't help because
 * nothing is written until the first response comes back — so every mount
 * would fire its own request. Holding the promise here means later mounts
 * await the first one instead.
 */
const inFlight = new Map<string, Promise<number | null>>();

function countVisit(slug: string): Promise<number | null> {
    const cacheKey = `qr_visit:${slug}`;

    const cached = sessionStorage.getItem(cacheKey);
    if (cached !== null) return Promise.resolve(Number(cached));

    console.log(cached);
    

    const pending = inFlight.get(slug);
    if (pending) return pending;

    const request = fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
    })
        .then((response) => (response.ok ? response.json() : null))
        .then((data) => {
            if (!data || typeof data.count !== "number") return null;
            // Written even if the component unmounted, so a remount reuses it.
            sessionStorage.setItem(cacheKey, String(data.count));
            return data.count as number;
        })
        .catch(() => null /* counting is decoration — never break the page */);

    inFlight.set(slug, request);
    return request;
}

/**
 * Records the visit and shows the running visitor count.
 *
 * Mounted once in the root layout: it works out the client slug from the URL
 * (or the custom domain), so new client folders are tracked with no extra
 * wiring. Renders nothing on the marketing pages.
 */
const VisitorCounter = () => {
    const pathname = usePathname();
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const slug = resolveSlug(window.location.hostname, pathname ?? "/");
        if (!slug) {
            setCount(null);
            return;
        }

        let cancelled = false;

        countVisit(slug).then((value) => {
            if (!cancelled && value !== null) setCount(value);
        });

        return () => {
            cancelled = true;
        };
    }, [pathname]);

    console.log(count);
    

    if (count === null) return null;

    return (
        <>
            <style>{`
                @keyframes qr-visitor-fade {
                    from { opacity: 0; transform: translateY(6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            <div
                aria-label={`${count} visitors`}
                style={{
                    position: "fixed",
                    left: 10,
                    top: 10,
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "7px 12px",
                    borderRadius: 999,
                    direction: "ltr",
                    background: "rgba(17, 17, 17, 0.55)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.35)",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    lineHeight: 1,
                    letterSpacing: "0.02em",
                    pointerEvents: "none",
                    animation: "qr-visitor-fade 400ms ease-out",
                }}
            >
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
                {count.toLocaleString("en-US")}
            </div>
        </>
    );
};

export default VisitorCounter;
