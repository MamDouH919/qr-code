import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { backendUrl } from "@/lib/backend";
import { recordVisit, readVisits } from "@/lib/visitor-store";
import {
    VISITOR_COOKIE,
    VISITOR_COOKIE_MAX_AGE,
    currentDay,
    isValidSlug,
} from "@/lib/visitors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BOT_PATTERN = /bot|crawl|spider|slurp|facebookexternalhit|preview|lighthouse|headless|monitor|pingdom|curl|wget/i;

export async function POST(request: NextRequest) {
    let slug: unknown;
    let extra: { source?: unknown; referrer?: unknown; language?: unknown } = {};
    try {
        const body = await request.json();
        slug = body.slug;
        extra = body;
    } catch {
        return NextResponse.json({ error: "invalid body" }, { status: 400 });
    }

    if (typeof slug !== "string" || !isValidSlug(slug)) {
        return NextResponse.json({ error: "invalid slug" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") ?? "";
    if (BOT_PATTERN.test(userAgent)) {
        return NextResponse.json({ count: null, counted: false, bot: true });
    }

    const existingId = request.cookies.get(VISITOR_COOKIE)?.value;

    // The cookie is the identity. It has to be minted before we record the
    // visit, otherwise the first visit is stored under one id and the second
    // under the cookie's id — counting the same person twice.
    const visitorId = existingId ?? randomUUID();

    // Pages managed in the dashboard count in the backend. A slug it does not know
    // (or a backend that is down) falls back to the local file, so the older pages
    // and the marketing site keep counting either way.
    const fromBackend = await recordInBackend(slug, visitorId, userAgent, extra);
    const { count, counted } = fromBackend ?? (await recordVisit(slug, visitorId, currentDay()));
    const response = NextResponse.json({ count, counted });

    // Re-sent on every visit so the expiry rolls forward. Losing the cookie is
    // what makes the same person count twice in a day.
    response.cookies.set(VISITOR_COOKIE, visitorId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: VISITOR_COOKIE_MAX_AGE,
    });

    return response;
}

/** Read a count without touching it — handy for debugging or a future dashboard. */
export async function GET(request: NextRequest) {
    const slug = request.nextUrl.searchParams.get("slug");

    if (!slug || !isValidSlug(slug)) {
        return NextResponse.json({ error: "invalid slug" }, { status: 400 });
    }

    const { count, today } = await readVisits(slug, currentDay());
    return NextResponse.json({ slug, count, today });
}

const text = (value: unknown, max: number) => (typeof value === "string" ? value.slice(0, max) : undefined);

async function recordInBackend(
    slug: string,
    visitorId: string,
    userAgent: string,
    extra: { source?: unknown; referrer?: unknown; language?: unknown },
): Promise<{ count: number; counted: boolean } | null> {
    const base = backendUrl();
    if (!base) return null;

    try {
        const res = await fetch(`${base}/public/visit`, {
            method: "POST",
            // The backend does its own bot filtering and device detection from the browser's own user agent.
            headers: { "Content-Type": "application/json", "User-Agent": userAgent },
            body: JSON.stringify({
                slug,
                visitorId,
                source: text(extra.source, 60),
                referrer: text(extra.referrer, 200),
                language: text(extra.language, 20),
            }),
            signal: AbortSignal.timeout(3000),
        });
        if (!res.ok) return null;
        const data = await res.json();
        return typeof data.count === "number" ? { count: data.count, counted: !!data.counted } : null;
    } catch {
        return null;
    }
}
