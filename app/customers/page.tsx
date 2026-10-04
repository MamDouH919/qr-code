import type { Metadata } from "next";

import CustomersDashboard, { type CustomerRow } from "@/components/CustomersDashboard";
import { fetchClientStats, type BackendClientStats } from "@/lib/backend";
import { currentDay } from "@/lib/visitors";

/** Counts change on every scan, so nothing here may be cached. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Customers",
    description: "All client pages and their visitor counts.",
    // Internal overview — keep it out of search results.
    robots: { index: false, follow: false },
};

const TREND_DAYS = 7;

function toRow(client: BackendClientStats): CustomerRow {
    const trend = client.byDay; // oldest first
    return {
        id: client.id,
        name: client.name,
        src: client.src || null,
        total: client.total,
        today: trend[trend.length - 1] ?? 0,
        week: trend.reduce((sum, count) => sum + count, 0),
        trend,
    };
}

export default async function CustomersPage() {
    const backend = await fetchClientStats(TREND_DAYS);
    const customers = (backend?.clients ?? []).map(toRow);

    return <CustomersDashboard customers={customers} day={backend?.days.at(-1) ?? currentDay()} />;
}
