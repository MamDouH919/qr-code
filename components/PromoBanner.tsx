"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Button, Chip, Container, Fab, Paper, Stack, Typography, useTheme, Zoom } from "@mui/material";
import { CheckCircle, QrCode2 } from "@mui/icons-material";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://qr.mountain-egy.site").replace(/\/$/, "");

const translations = {
    ar: {
        badge: "عرض خاص",
        title: "احصل على الـ QR Code الخاص بنشاطك",
        highlight: "واستمتع بأول ٣ شهور مجاناً",
        points: ["صفحة احترافية بإسمك وألوانك", "عدّل بياناتك في أي وقت بدون ما يتغير الـ QR", "إحصائيات لزيارات صفحتك"],
        cta: "ابدأ مجاناً",
        floating: "أول ٣ شهور مجاناً",
        fine: "بدون بطاقة دفع. بعد ٣ شهور تجدد بالسعر العادي لو حبيت تكمل.",
    },
    en: {
        badge: "Special offer",
        title: "Get a QR code for your business",
        highlight: "and enjoy your first 3 months free",
        points: ["A professional page with your name and colors", "Edit your details anytime, the QR never changes", "Visit statistics for your page"],
        cta: "Start free",
        floating: "3 months free",
        fine: "No card needed. After 3 months you renew at the regular price, only if you want to continue.",
    },
};

/**
 * "Get your own QR, first 3 months free" card shown at the bottom of every client page,
 * plus a floating button that scrolls to it while it is still further down.
 */
export default function PromoBanner({ slug }: { slug: string }) {
    const theme = useTheme();
    const language = theme.direction === "rtl" ? "ar" : "en";
    const t = translations[language];
    const href = `${SITE}/get-qr?ref=${encodeURIComponent(slug)}&lang=${language}`;

    const cardRef = useRef<HTMLDivElement>(null);
    const [showFloating, setShowFloating] = useState(false);

    useEffect(() => {
        const node = cardRef.current;
        if (!node || typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            ([entry]) => setShowFloating(!entry.isIntersecting && entry.boundingClientRect.top > 0),
            // The card counts as visible only once it clears the floating button.
            { rootMargin: "0px 0px -80px 0px" },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const scrollToCard = () => cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    return (
        <>
            <Container ref={cardRef}>
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        border: 1,
                        borderColor: "primary.main",
                        backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}22 0%, transparent 70%)`,
                    }}
                >
                    <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
                        <Chip icon={<QrCode2 />} label={t.badge} color="primary" size="small" />
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                {t.title}
                            </Typography>
                            <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
                                {t.highlight}
                            </Typography>
                        </Box>
                        <Stack spacing={0.75}>
                            {t.points.map((point) => (
                                <Stack key={point} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                    <CheckCircle color="primary" sx={{ fontSize: 18 }} />
                                    <Typography variant="body2">{point}</Typography>
                                </Stack>
                            ))}
                        </Stack>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            component="a"
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t.cta}
                        </Button>
                        <Typography variant="caption" color="text.secondary">
                            {t.fine}
                        </Typography>
                    </Stack>
                </Paper>
            </Container>

            {/* Equal side gaps keep it clear of the language button in both directions. */}
            <Box
                sx={{
                    position: "fixed",
                    left: 76,
                    right: 76,
                    bottom: 14,
                    zIndex: 100,
                    display: "flex",
                    justifyContent: "center",
                    pointerEvents: "none",
                }}
            >
                <Zoom in={showFloating}>
                    <Fab
                        variant="extended"
                        color="primary"
                        onClick={scrollToCard}
                        sx={{
                            gap: 1,
                            maxWidth: "100%",
                            whiteSpace: "nowrap",
                            fontWeight: 800,
                            textTransform: "none",
                            pointerEvents: "auto",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.9)",
                        }}
                    >
                        <QrCode2 />
                        {t.floating}
                    </Fab>
                </Zoom>
            </Box>
        </>
    );
}
