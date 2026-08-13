import { promises as fs } from "fs";
import path from "path";

import { HISTORY_DAYS_KEPT } from "./visitors";

/**
 * Visitor counts kept in a plain JSON file.
 *
 * Shape:
 * {
 *   "pizza-pepo": {
 *     "total": 42,
 *     "days": { "2026-08-12": 5 },
 *     "visitors": ["<visitor-id>", ...]
 *   }
 * }
 *
 * `visitors` is what makes visits unique: a browser already on the list is
 * never counted again, so the list is kept in full for as long as the client
 * exists. `days` records how many first-time visitors arrived on each day and
 * is trimmed on every write.
 */

export type ClientStats = {
    total: number;
    days: Record<string, number>;
    visitors: string[];
};

export type Store = Record<string, ClientStats>;

const STORE_PATH =
    process.env.VISITORS_FILE ?? path.join(process.cwd(), "data", "visitors.json");

/**
 * Route handlers run concurrently, so every read-modify-write goes through this
 * chain. Without it two visits landing together would both read the old total
 * and one of the two would be lost.
 */
let queue: Promise<unknown> = Promise.resolve();

function withLock<T>(task: () => Promise<T>): Promise<T> {
    const result = queue.then(task, task);
    queue = result.catch(() => undefined);
    return result;
}

/**
 * Bring one client's entry up to the current shape.
 *
 * Files written before visitors were counted once-ever kept the ids per day
 * under `seen`; those ids are folded into the flat list so returning visitors
 * from back then are not counted a second time. `total` is left as it was —
 * it is the running count, and the old per-day rule really did happen.
 */
function normalize(raw: unknown): ClientStats {
    const entry = (raw ?? {}) as Partial<ClientStats> & {
        seen?: Record<string, unknown>;
    };

    const visitors = Array.isArray(entry.visitors) ? [...entry.visitors] : [];
    for (const ids of Object.values(entry.seen ?? {})) {
        if (!Array.isArray(ids)) continue;
        for (const id of ids) {
            if (typeof id === "string" && !visitors.includes(id)) visitors.push(id);
        }
    }

    return {
        total: typeof entry.total === "number" ? entry.total : visitors.length,
        days: entry.days && typeof entry.days === "object" ? { ...entry.days } : {},
        visitors,
    };
}

async function readStore(): Promise<Store> {
    try {
        const raw = await fs.readFile(STORE_PATH, "utf8");
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") return {};

        return Object.fromEntries(
            Object.entries(parsed).map(([slug, stats]) => [slug, normalize(stats)])
        );
    } catch (error) {
        const code = (error as NodeJS.ErrnoException).code;
        // A missing file just means nobody has visited yet.
        if (code !== "ENOENT") {
            console.error("[visitors] could not read store, starting empty", error);
        }
        return {};
    }
}

async function writeStore(store: Store): Promise<void> {
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    // Write then rename, so a crash mid-write can't leave a truncated file.
    const tempPath = `${STORE_PATH}.${process.pid}.tmp`;
    await fs.writeFile(tempPath, JSON.stringify(store, null, 2), "utf8");
    await fs.rename(tempPath, STORE_PATH);
}

/** Drop the daily totals we no longer report on. */
function prune(stats: ClientStats): void {
    const historyDays = Object.keys(stats.days).sort();
    for (const day of historyDays.slice(0, -HISTORY_DAYS_KEPT)) {
        delete stats.days[day];
    }
}

function emptyStats(): ClientStats {
    return { total: 0, days: {}, visitors: [] };
}

/**
 * Count the visit unless this browser has been counted before.
 * Returns the running total either way, so the badge always has a number.
 */
export function recordVisit(
    slug: string,
    visitorId: string,
    day: string
): Promise<{ count: number; counted: boolean }> {
    return withLock(async () => {
        const store = await readStore();
        const stats = store[slug] ?? emptyStats();

        if (stats.visitors.includes(visitorId)) {
            return { count: stats.total, counted: false };
        }

        stats.visitors.push(visitorId);
        stats.days[day] = (stats.days[day] ?? 0) + 1;
        stats.total += 1;
        prune(stats);

        store[slug] = stats;
        await writeStore(store);

        return { count: stats.total, counted: true };
    });
}

/** Read counts without touching them. */
export async function readVisits(
    slug: string,
    day: string
): Promise<{ count: number; today: number }> {
    const store = await readStore();
    const stats = store[slug];
    return {
        count: stats?.total ?? 0,
        today: stats?.days[day] ?? 0,
    };
}

/** Every client's counts — for a future dashboard. */
export async function readAllVisits(): Promise<Store> {
    return readStore();
}
