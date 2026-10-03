import { NextResponse } from "next/server";

import { fetchClientList } from "@/lib/backend";

export const revalidate = 30;

/** Proxy for the customers strip — the browser never talks to the backend directly. */
export async function GET() {
    const clients = await fetchClientList();
    return NextResponse.json(clients ?? []);
}
