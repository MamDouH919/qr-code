import { NextRequest, NextResponse } from "next/server";

function getClientIp(req: NextRequest) {
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");

    if (forwarded) return forwarded.split(",")[0].trim();
    if (realIp) return realIp;
    return "8.8.8.8";
}

export async function GET(req: NextRequest) {
    const ip = getClientIp(req);

    const res = await fetch(
        `https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`,
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
