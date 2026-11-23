import type { Metadata } from "next";

import CustomersDashboard, { type CustomerRow } from "@/components/CustomersDashboard";
import { fetchClientStats, type BackendClientStats } from "@/lib/backend";
import { readAllVisits } from "@/lib/visitor-store";
import { currentDay, recentDays } from "@/lib/visitors";

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

/**
 * Pages that are not dashboard clients but still count visits (in the local file).
 * They are listed next to the clients so their numbers show up here too.
 */
const LOCAL_PAGES: { id: string; name: string }[] = [{ id: "get-qr", name: "Signup form (/get-qr)" }];

async function localRows(day: string): Promise<CustomerRow[]> {
    const store = await readAllVisits();
    const days = recentDays(day, TREND_DAYS).reverse(); // oldest first, like the backend

    return LOCAL_PAGES.map(({ id, name }) => {
        const stats = store[id];
        const trend = days.map((d) => stats?.days[d] ?? 0);
        return {
            id,
            name,
            src: null,
            total: stats?.total ?? 0,
            today: trend[trend.length - 1] ?? 0,
            week: trend.reduce((sum, count) => sum + count, 0),
            trend,
        };
    });
}

export default async function CustomersPage() {
    const backend = await fetchClientStats(TREND_DAYS);
    const day = backend?.days.at(-1) ?? currentDay();
    const backendIds = new Set((backend?.clients ?? []).map((client) => client.id));
    const local = (await localRows(day)).filter((row) => !backendIds.has(row.id));
    const customers = [...(backend?.clients ?? []).map(toRow), ...local];

    return <CustomersDashboard customers={customers} day={day} />;
}
