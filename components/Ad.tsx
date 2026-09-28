import { Box, Chip, Container, Paper, Typography, useTheme } from "@mui/material";

const translations = {
    en: {
        validUntil: "Valid until",
        ad: "Ad",
    },
    ar: {
        validUntil: "العرض ساري حتى",
        ad: "إعلان",
    },
};

interface AdProps {
    title: string;
    description?: string;
    badge?: string;
    image?: string;
    ctaText?: string;
    ctaLink?: string;
    validUntil?: string;
}

const Ad = ({ title, description, badge, image, ctaLink, validUntil }: AdProps) => {
    const theme = useTheme();
    const language = theme.direction === "rtl" ? "ar" : "en";
    const t = translations[language];

    return (
        <Box>
            <Container>
                <Paper
                    component={ctaLink ? "a" : "div"}
                    href={ctaLink}
                    target={ctaLink ? "_blank" : undefined}
                    rel={ctaLink ? "noopener noreferrer" : undefined}
                    sx={{
                        position: "relative",
                        display: "block",
                        overflow: "hidden",
                        borderRadius: 3,
                        textDecoration: "none",
                        cursor: ctaLink ? "pointer" : "default",
                        width: "100%",
                        aspectRatio: "10 / 4",
                        backgroundImage: image ? `url('${image}')` : undefined,
                        backgroundColor: image ? undefined : "grey.900",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Chip
                        label={badge || t.ad}
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 12,
                            insetInlineStart: 12,
                            height: 22,
                            bgcolor: "rgba(0,0,0,0.55)",
                            color: "rgba(255,255,255,0.85)",
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: 0.3,
                            backdropFilter: "blur(2px)",
                        }}
                    />

                    <Box
                        sx={{
                            position: "absolute",
                            insetInline: 0,
                            bottom: 0,
                            px: 2.5,
                            py: 2,
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0) 100%)",
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            sx={{ color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                        >
                            {title}
                        </Typography>

                        {description && (
                            <Typography
                                variant="body2"
                                sx={{ color: "rgba(255,255,255,0.9)", mt: 0.25 }}
                            >
                                {description}
                            </Typography>
                        )}

                        {validUntil && (
                            <Typography
                                variant="caption"
                                sx={{ color: "rgba(255,255,255,0.75)", display: "block", mt: 0.5 }}
                            >
                                {t.validUntil}: {validUntil}
                            </Typography>
                        )}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Ad;
