import { NextRequest, NextResponse } from "next/server";

import { backendUrl } from "@/lib/backend";
import { readVisitorId, setVisitorCookie } from "@/lib/visitor-id";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AD_ID = /^[a-f0-9]{24}$/;

/**
 * Ad link target. Counts the click against this visitor (so "users who clicked"
 * is per person, not per tap), then sends them to the advertiser.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const home = new URL("/", request.url);
    if (!AD_ID.test(id)) return NextResponse.redirect(home);

    const { visitorId } = readVisitorId(request);
    let target: string | null = null;
    try {
        const res = await fetch(`${backendUrl()}/public/ads/${id}/click`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "User-Agent": request.headers.get("user-agent") ?? "" },
            body: JSON.stringify({ visitorId }),
            signal: AbortSignal.timeout(3000),
        });
        if (res.ok) target = (await res.json()).url ?? null;
    } catch {
        /* fall through */
    }

    // The backend only ever returns http(s) links, so this cannot be turned into a javascript: redirect.
    const response = NextResponse.redirect(target ?? home);
    setVisitorCookie(response, visitorId);
    return response;
}
