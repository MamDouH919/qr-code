"use client";

import { Box, Button, Chip, Container, Paper, Stack, Typography, useTheme } from "@mui/material";
import { CheckCircle, QrCode2 } from "@mui/icons-material";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://qr.mountain-egy.site").replace(/\/$/, "");

const translations = {
    ar: {
        badge: "عرض خاص",
        title: "احصل على الـ QR Code الخاص بنشاطك",
        highlight: "واستمتع بأول ٣ شهور مجاناً",
        points: ["صفحة احترافية بإسمك وألوانك", "عدّل بياناتك في أي وقت بدون ما يتغير الـ QR", "إحصائيات لزيارات صفحتك"],
        cta: "ابدأ مجاناً",
        fine: "بدون بطاقة دفع. بعد ٣ شهور تجدد بالسعر العادي لو حبيت تكمل.",
    },
    en: {
        badge: "Special offer",
        title: "Get a QR code for your business",
        highlight: "and enjoy your first 3 months free",
        points: ["A professional page with your name and colors", "Edit your details anytime, the QR never changes", "Visit statistics for your page"],
        cta: "Start free",
        fine: "No card needed. After 3 months you renew at the regular price, only if you want to continue.",
    },
};

/** "Get your own QR, first 3 months free" card shown at the bottom of every client page. */
export default function PromoBanner({ slug }: { slug: string }) {
    const theme = useTheme();
    const language = theme.direction === "rtl" ? "ar" : "en";
    const t = translations[language];
    const href = `${SITE}/get-qr?ref=${encodeURIComponent(slug)}&lang=${language}`;

    return (
        <Container>
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
    );
}
