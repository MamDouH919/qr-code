import type { Metadata } from "next";

import CustomersDashboard, { type CustomerRow } from "@/components/CustomersDashboard";
import { fetchClientStats } from "@/lib/backend";
import { ourClients } from "@/lib/clients";
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

function toRow(
    client: { id: string; name: string; src: string | null },
    total: number,
    trend: number[], // oldest first
): CustomerRow {
    return {
        id: client.id,
        name: client.name,
        src: client.src || null,
        total,
        today: trend[trend.length - 1] ?? 0,
        week: trend.reduce((sum, count) => sum + count, 0),
        trend,
    };
}

export default async function CustomersPage() {
    const today = currentDay();
    const [backend, store] = await Promise.all([fetchClientStats(TREND_DAYS), readAllVisits()]);

    // Pages managed in the dashboard are counted by the backend.
    const fromBackend = (backend?.clients ?? []).map((client) => toRow(client, client.total, client.byDay));

    // Slugs the backend does not know still count in the local file (see /api/visit),
    // as does everything when the backend is down.
    const known = new Set(fromBackend.map((row) => row.id));
    const week = [...recentDays(today, TREND_DAYS)].reverse(); // oldest first
    const localSlugs = new Set([...ourClients.map((client) => client.id), ...Object.keys(store)]);

    const fromFile = [...localSlugs]
        .filter((slug) => !known.has(slug))
        .map((slug) => {
            const client = ourClients.find((c) => c.id === slug) ?? { id: slug, name: slug, src: null };
            const stats = store[slug];
            return toRow(client, stats?.total ?? 0, week.map((day) => stats?.days?.[day] ?? 0));
        });

    const customers = [...fromBackend, ...fromFile];

    return <CustomersDashboard customers={customers} day={backend?.days.at(-1) ?? today} />;
}
