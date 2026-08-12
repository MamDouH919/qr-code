import { promises as fs } from "fs";
import path from "path";

import { SEEN_DAYS_KEPT, HISTORY_DAYS_KEPT } from "./visitors";

/**
 * Visitor counts kept in a plain JSON file.
 *
 * Shape:
 * {
 *   "pizza-pepo": {
 *     "total": 42,
 *     "days": { "2026-08-12": 5 },
 *     "seen": { "2026-08-12": ["<visitor-id>", ...] }
 *   }
 * }
 *
 * `seen` is what makes visits unique: a browser already listed under today's
 * date is not counted again. Old entries are pruned on every write so the file
 * stays small.
 */

export type ClientStats = {
    total: number;
    days: Record<string, number>;
    seen: Record<string, string[]>;
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

async function readStore(): Promise<Store> {
    try {
        const raw = await fs.readFile(STORE_PATH, "utf8");
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? (parsed as Store) : {};
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

/** Drop the visitor-id lists and daily totals we no longer need. */
function prune(stats: ClientStats): void {
    const seenDays = Object.keys(stats.seen).sort();
    for (const day of seenDays.slice(0, -SEEN_DAYS_KEPT)) {
        delete stats.seen[day];
    }

    const historyDays = Object.keys(stats.days).sort();
    for (const day of historyDays.slice(0, -HISTORY_DAYS_KEPT)) {
        delete stats.days[day];
    }
}

function emptyStats(): ClientStats {
    return { total: 0, days: {}, seen: {} };
}

/**
 * Count the visit unless this browser was already counted today.
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

        const seenToday = stats.seen[day] ?? [];
        if (seenToday.includes(visitorId)) {
            return { count: stats.total, counted: false };
        }

        seenToday.push(visitorId);
        stats.seen[day] = seenToday;
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
