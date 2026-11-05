"use client";

import { useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Rating,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { CheckCircleOutline, Close, StarRounded } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";

type ReviewValues = { name: string; job: string; content: string; rate: number };

const STORAGE_KEY = "testimonialPrompt";
const REMIND_AFTER_MS = 7 * 24 * 60 * 60 * 1000;

const TEXT = {
    ar: {
        title: "شارك تجربتك",
        intro: "يسعدنا رأيك! شاركنا تجربتك مع أراب كلينك وساعد غيرك في اتخاذ القرار الصحيح — لن يستغرق الأمر سوى دقيقة.",
        name: "الاسم",
        job: "الوظيفة",
        rate: "التقييم",
        content: "المحتوى",
        save: "حفظ",
        close: "إغلاق",
        required: "هذا الحقل مطلوب",
        failed: "تعذر إرسال رأيك، برجاء المحاولة مرة أخرى.",
        thanks: "شكراً على ملاحظاتك!",
        thanksText: "تم إرسال رأيك وهو قيد المراجعة.",
    },
    en: {
        title: "Share Your Experience",
        intro: "We would love to hear from you! Share your experience with Arab Clinic and help others make the right choice — it only takes a minute.",
        name: "Name",
        job: "Job",
        rate: "Rate",
        content: "Content",
        save: "Save",
        close: "Close",
        required: "This field is required",
        failed: "We couldn't send your review. Please try again.",
        thanks: "Thank you for your feedback!",
        thanksText: "Your testimonial has been submitted and is pending review.",
    },
};

/** First visit: open. Dismissed: open again after 7 days. Submitted: never again. */
function shouldOpen(): boolean {
    try {
        const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null");
        if (!saved) return true;
        return saved.status !== "submitted" && Date.now() - saved.at >= REMIND_AFTER_MS;
    } catch {
        return true;
    }
}

function remember(status: "dismissed" | "submitted") {
    try {
        // Closing the dialog after a review was sent must not bring the popup back.
        const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null");
        if (status === "dismissed" && saved?.status === "submitted") return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ status, at: Date.now() }));
    } catch {
        // Storage can be blocked; the dialog just opens again on the next visit.
    }
}

const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "24px" } };

export default function ArabClinicReviewDialog({ language }: { language: "ar" | "en" }) {
    const t = TEXT[language];
    const page = useTheme();
    // The landing pages are dark; this dialog is white and keeps the client's colour and font.
    const theme = useMemo(
        () => ({
            ...createTheme({
                direction: page.direction,
                palette: { mode: "light", primary: { main: page.palette.primary.main } },
                typography: { fontFamily: page.typography.fontFamily, button: { textTransform: "none" } },
            }),
            vars: undefined,
        }),
        [page],
    );
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [failed, setFailed] = useState(false);

    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ReviewValues>({
        defaultValues: { name: "", job: "", content: "", rate: 5 },
    });

    useEffect(() => {
        // In an effect because localStorage only exists in the browser.
        if (shouldOpen()) setOpen(true);
    }, []);

    const handleOpen = () => {
        // After a sent review, start a fresh form instead of showing the thank-you screen again.
        if (submitted) {
            reset();
            setSubmitted(false);
        }
        setFailed(false);
        setOpen(true);
    };

    const handleClose = () => {
        remember("dismissed");
        setOpen(false);
    };

    const onSubmit = async (values: ReviewValues) => {
        setFailed(false);
        try {
            const res = await fetch("/api/arab-clinic/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values, lang: language }),
            });
            if (!res.ok) throw new Error(`status ${res.status}`);
            remember("submitted");
            setSubmitted(true);
        } catch {
            setFailed(true);
        }
    };

    const requiredText = (value: string) => !!value.trim() || t.required;

    return (
        <>
            <Box>
                <Container>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={<StarRounded />}
                        onClick={handleOpen}
                        sx={{ minHeight: 56, borderRadius: 990, fontWeight: 700, textTransform: "none", color: "#fff" }}
                    >
                        {t.title}
                    </Button>
                </Container>
            </Box>
            <ThemeProvider theme={theme}>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="sm"
                    fullWidth
                    slotProps={{ paper: { sx: { borderRadius: "24px" } } }}
                >
                    <DialogTitle component="div">
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6" component="h2" fontWeight={700}>
                                {t.title}
                            </Typography>
                            <IconButton onClick={handleClose} size="small" aria-label={t.close}>
                                <Close />
                            </IconButton>
                        </Stack>
                    </DialogTitle>

                    <DialogContent>
                        {submitted ? (
                            <Stack alignItems="center" spacing={2} py={4}>
                                <CheckCircleOutline sx={{ fontSize: 64, color: "success.main" }} />
                                <Typography variant="h6" component="p" fontWeight={700} textAlign="center">
                                    {t.thanks}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    {t.thanksText}
                                </Typography>
                                <Button variant="contained" onClick={handleClose} sx={{ mt: 1, borderRadius: "24px" }}>
                                    {t.close}
                                </Button>
                            </Stack>
                        ) : (
                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ pt: 1 }}>
                                <Stack spacing={3}>
                                    <Typography variant="body1" color="text.secondary">
                                        {t.intro}
                                    </Typography>

                                    <Controller
                                        name="name"
                                        control={control}
                                        rules={{ validate: requiredText }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={t.name}
                                                fullWidth
                                                required
                                                error={!!errors.name}
                                                helperText={errors.name?.message}
                                                sx={fieldSx}
                                                slotProps={{ htmlInput: { maxLength: 100 } }}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="job"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={t.job}
                                                fullWidth
                                                sx={fieldSx}
                                                slotProps={{ htmlInput: { maxLength: 100 } }}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="rate"
                                        control={control}
                                        render={({ field }) => (
                                            <Box>
                                                <Typography variant="body2" fontWeight={600} mb={0.5}>
                                                    {t.rate}
                                                </Typography>
                                                <Rating
                                                    name="rate"
                                                    value={field.value}
                                                    onChange={(_, value) => field.onChange(value ?? 5)}
                                                    size="large"
                                                />
                                            </Box>
                                        )}
                                    />

                                    <Controller
                                        name="content"
                                        control={control}
                                        rules={{ validate: requiredText }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={t.content}
                                                fullWidth
                                                required
                                                multiline
                                                rows={4}
                                                error={!!errors.content}
                                                helperText={errors.content?.message}
                                                sx={fieldSx}
                                                slotProps={{ htmlInput: { maxLength: 2000 } }}
                                            />
                                        )}
                                    />

                                    {failed && <Alert severity="error">{t.failed}</Alert>}

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        disabled={isSubmitting}
                                        startIcon={isSubmitting ? <CircularProgress size={18} /> : null}
                                        sx={{ borderRadius: "24px" }}
                                    >
                                        {t.save}
                                    </Button>
                                </Stack>
                            </Box>
                        )}
                    </DialogContent>
                </Dialog>
            </ThemeProvider>
        </>
    );
}
