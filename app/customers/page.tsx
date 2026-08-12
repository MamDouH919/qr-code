import type { Metadata } from "next";

import CustomersDashboard, { type CustomerRow } from "@/components/CustomersDashboard";
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

export default async function CustomersPage() {
    const store = await readAllVisits();
    const today = currentDay();
    const week = recentDays(today, TREND_DAYS);

    // Counts are stored per slug, so a page that was removed from the client
    // list still has numbers worth showing.
    const listed = new Set(ourClients.map((client) => client.id));
    const unlisted = Object.keys(store)
        .filter((slug) => !listed.has(slug))
        .map((slug) => ({ id: slug, name: slug, src: null }));

    const customers: CustomerRow[] = [...ourClients, ...unlisted].map((client) => {
        const stats = store[client.id];
        const perDay = week.map((day) => stats?.days?.[day] ?? 0);

        return {
            id: client.id,
            name: client.name,
            src: client.src,
            total: stats?.total ?? 0,
            today: perDay[0],
            week: perDay.reduce((sum, count) => sum + count, 0),
            trend: [...perDay].reverse(), // oldest first, for the sparkline
        };
    });

    return <CustomersDashboard customers={customers} day={today} />;
}
