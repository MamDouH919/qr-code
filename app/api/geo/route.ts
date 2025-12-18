import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const forwarded = req.headers.get("x-forwarded-for");
    console.log({ forwarded: forwarded });

    const ip = forwarded?.split(",")[0] || "8.8.8.8"; // fallback

    const res = await fetch(
        `https://ipinfo.io/${ip}?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`,
        { cache: "no-store" }
    );

    const data = await res.json();

    console.log({ ddd: data });

    return NextResponse.json({
        country: data.country || "EG",
        city: data.city,
        region: data.region,
    });
}
