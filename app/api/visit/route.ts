import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

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
    try {
        ({ slug } = await request.json());
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

    const { count, counted } = await recordVisit(slug, visitorId, currentDay());
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
