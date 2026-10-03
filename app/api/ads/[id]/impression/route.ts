import { NextRequest, NextResponse } from "next/server";

import { backendUrl } from "@/lib/backend";
import { readVisitorId, setVisitorCookie } from "@/lib/visitor-id";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AD_ID = /^[a-f0-9]{24}$/;

/** An ad scrolled into view. The backend counts it once per visitor per day. */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!AD_ID.test(id)) return NextResponse.json({ error: "invalid ad" }, { status: 400 });

    const { visitorId } = readVisitorId(request);
    try {
        await fetch(`${backendUrl()}/public/ads/${id}/impression`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "User-Agent": request.headers.get("user-agent") ?? "" },
            body: JSON.stringify({ visitorId }),
            signal: AbortSignal.timeout(3000),
        });
    } catch {
        /* an uncounted view must never break the page */
    }
    const response = NextResponse.json({ ok: true });
    setVisitorCookie(response, visitorId);
    return response;
}
