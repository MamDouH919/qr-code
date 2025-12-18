import { NextRequest, NextResponse } from "next/server";

// دالة للحصول على IP المستخدم الحقيقي
function getClientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const socketIp = (req as any).socket?.remoteAddress; // fallback Node.js

  if (forwarded) return forwarded.split(",")[0].trim();
  if (realIp) return realIp;
  if (socketIp) return socketIp;
  return "8.8.8.8"; // fallback عالمي
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);

  // fetch geolocation
  const res = await fetch(
    `https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  const country = data.country || "EG";

  // إنشاء Response مع Cookie لتخزين الدولة
  const response = NextResponse.json({
    ip: data.ip || ip,
    city: data.city,
    region: data.region,
    country,
  });

  return response;
}