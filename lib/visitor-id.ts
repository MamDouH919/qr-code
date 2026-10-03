import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { VISITOR_COOKIE, VISITOR_COOKIE_MAX_AGE } from "@/lib/visitors";

/** The visitor's id: their cookie, or a fresh one if this is their first request. */
export function readVisitorId(request: NextRequest): { visitorId: string; isNew: boolean } {
    const existing = request.cookies.get(VISITOR_COOKIE)?.value;
    return existing ? { visitorId: existing, isNew: false } : { visitorId: randomUUID(), isNew: true };
}

/** Re-sent on every visit so the expiry rolls forward. */
export function setVisitorCookie(response: NextResponse, visitorId: string) {
    response.cookies.set(VISITOR_COOKIE, visitorId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: VISITOR_COOKIE_MAX_AGE,
    });
}
