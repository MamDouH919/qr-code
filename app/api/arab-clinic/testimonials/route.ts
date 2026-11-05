import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_URL = (process.env.ARAB_CLINIC_API_URL ?? "").replace(/\/$/, "");

const text = (value: unknown, maxLength: number) =>
    typeof value === "string" && value.trim().length <= maxLength ? value.trim() : "";

/**
 * Sends a visitor's review to the Arab Clinic API. It goes through the server because
 * that API's CORS list rejects the QR domains: the browser would have the review saved
 * but be unable to read the response, and show the visitor an error.
 */
export async function POST(request: NextRequest) {
    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "invalid body" }, { status: 400 });
    }

    const lang = body.lang === "en" ? "en" : "ar";
    const name = text(body.name, 100);
    const job = text(body.job, 100);
    const content = text(body.content, 2000);
    const rate = Number(body.rate);

    if (!name || !content || !Number.isInteger(rate) || rate < 1 || rate > 5) {
        return NextResponse.json({ error: "invalid review" }, { status: 400 });
    }

    const form = new FormData();
    form.append(`name[${lang}]`, name);
    if (job) form.append(`job[${lang}]`, job);
    form.append(`content[${lang}]`, content);
    form.append("rate", String(rate));

    try {
        const res = await fetch(`${API_URL}/testimonials`, {
            method: "POST",
            body: form,
            signal: AbortSignal.timeout(15000),
        });
        if (!res.ok) {
            console.error(`Arab Clinic testimonial rejected: ${res.status}`);
            return NextResponse.json({ error: "review not saved" }, { status: 502 });
        }
    } catch (error) {
        console.error("Arab Clinic testimonial failed", error);
        return NextResponse.json({ error: "review not saved" }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
}
