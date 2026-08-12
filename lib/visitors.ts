/**
 * Visitor counting rules, shared by the API route and the client badge.
 *
 * A "visitor" is one browser, counted once per calendar day (Cairo time) per
 * client page. Someone who scans the QR three times in an afternoon counts
 * once; if they come back tomorrow they count again.
 */

/** Route segments under /app that are not client pages. */
const NON_CLIENT_SEGMENTS = new Set(["api", "mountain", "_next", "favicon.ico"]);

/** Custom domains that serve a single client page at the root path. */
export const DOMAIN_TO_SLUG: Record<string, string> = {
    "qr.arabclinic.net": "arab-clinic",
    "dr-coffee.softwave.site": "dr-coffee",
    "qr.osaoptics.com": "osa",
};

/** Folder-name shape: lowercase letters, digits and dashes. */
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,39}$/;

export function isValidSlug(slug: string): boolean {
    return SLUG_PATTERN.test(slug) && !NON_CLIENT_SEGMENTS.has(slug);
}

/**
 * Work out which client page we are on.
 *
 * Custom domains win, because on those the client page is served at "/" and
 * the pathname tells us nothing. Otherwise the first path segment is the
 * folder name under app/(clients), so new clients are tracked with no config.
 */
export function resolveSlug(hostname: string, pathname: string): string | null {
    const domainSlug = DOMAIN_TO_SLUG[hostname.toLowerCase()];
    if (domainSlug) return domainSlug;

    const segment = pathname.split("/").filter(Boolean)[0];
    if (!segment) return null;

    const slug = decodeURIComponent(segment).toLowerCase();
    return isValidSlug(slug) ? slug : null;
}

/** Today's date as YYYY-MM-DD in Cairo time, so days roll over locally. */
export function currentDay(): string {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Africa/Cairo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());
}

export const VISITOR_COOKIE = "qr_vid";
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/** Days of visitor-id lists to keep. Two covers any timezone edge. */
export const SEEN_DAYS_KEPT = 2;
/** Days of per-day totals to keep, for reporting. */
export const HISTORY_DAYS_KEPT = 90;
