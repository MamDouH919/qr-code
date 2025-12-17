import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const country =
    req.headers.get("x-vercel-ip-country") || "EG";

  const res = NextResponse.next();
  res.headers.set("x-user-country", country);

  return res;
}
