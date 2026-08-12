"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";

import createEmotionCache from "./create-emotion-cache";

/**
 * Emotion cache wired into the App Router's server rendering.
 *
 * Without this, emotion emits its <style> tags inline where a styled component
 * sits. The client renders that component with no style tag beside it, so
 * hydration reports a mismatch and throws the whole tree away. Setting
 * `cache.compat` stops the inline tags; the collected rules are flushed into
 * the document head instead, which both sides agree on.
 */
const EmotionRegistry = ({ children }: { children: React.ReactNode }) => {
    const [registry] = useState(() => {
        const cache = createEmotionCache(false);
        cache.compat = true;

        let names: string[] = [];
        const insert = cache.insert;
        cache.insert = (...args) => {
            const [, serialized] = args;
            if (cache.inserted[serialized.name] === undefined) {
                names.push(serialized.name);
            }
            return insert(...args);
        };

        const flush = () => {
            const flushed = names;
            names = [];
            return flushed;
        };

        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = registry.flush();
        if (names.length === 0) return null;

        const styles = names
            .map((name) => registry.cache.inserted[name])
            .filter((style) => typeof style === "string")
            .join("");

        return (
            <style
                data-emotion={`${registry.cache.key} ${names.join(" ")}`}
                dangerouslySetInnerHTML={{ __html: styles }}
            />
        );
    });

    return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
};

export default EmotionRegistry;
