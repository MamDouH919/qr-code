"use client";

import { FormEvent, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { CacheProvider } from "@emotion/react";
import {
    Alert,
    Box,
    Button,
    Chip,
    Container,
    LinearProgress,
    CssBaseline,
    Paper,
    Stack,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import { ArrowBack, ArrowForward, CheckCircle, QrCode2, WhatsApp } from "@mui/icons-material";

import createEmotionCache from "@/lib/create-emotion-cache";
import getTheme from "@/lib/theme";

type Lang = "ar" | "en";
type PlanId = "basic" | "professional" | "enterprise";

/** Same plans and prices as the pricing section on the home page. */
const PLANS: Record<PlanId, { name: string; egp: number; usd: number; featured?: boolean; features: Record<Lang, string[]> }> = {
    basic: {
        name: "Basic",
        egp: 800,
        usd: 20,
        features: {
            ar: ["سوشيال ميديا وأرقام وعناوين", "ألوان وعنوان ووصف خاص", "لوجو وأيقونة خاصة", "لغتين"],
            en: ["Social media, phones & locations", "Custom color, title & description", "Custom logo & favicon", "Two languages"],
        },
    },
    professional: {
        name: "Professional",
        egp: 1000,
        usd: 25,
        featured: true,
        features: {
            ar: ["كل مميزات Basic", "١٠ صور مخصصة", "قسم مخصص عند الحاجة"],
            en: ["Everything in Basic", "10 custom images", "Custom section if needed"],
        },
    },
    enterprise: {
        name: "Enterprise",
        egp: 1800,
        usd: 40,
        features: {
            ar: ["كل مميزات Professional", "٢٠ صورة مخصصة", "تصميم مخصص عند الحاجة"],
            en: ["Everything in Professional", "20 custom images", "Custom style if needed"],
        },
    },
};

const t = {
    ar: {
        badge: "أول ٣ شهور مجاناً",
        title: "احصل على الـ QR Code الخاص بنشاطك",
        subtitle: "اختار الباقة وسيب بياناتك، وإحنا نراجع طلبك ونتواصل معاك على واتساب. من غير بطاقة دفع ومن غير التزام.",
        step: (n: number) => `الخطوة ${n} من 2`,
        plan: "اختار الباقة المناسبة",
        popular: "الأكثر طلباً",
        free3: "٣ شهور مجاناً",
        then: "وبعدها",
        perYear: "/ سنة",
        next: "التالي",
        back: "رجوع",
        change: "تغيير",
        yourPlan: "الباقة",
        business: "اسم النشاط",
        contact: "اسمك",
        phone: "رقم الموبايل (واتساب)",
        phoneHelp: "هنتواصل معاك عليه",
        email: "الإيميل (اختياري)",
        type: "نوع النشاط (مطعم، عيادة، متجر...)",
        links: "لينكات السوشيال ميديا أو الموقع (اختياري)",
        notes: "ملاحظات أو ألوان تفضلها (اختياري)",
        required: "مطلوب",
        badName: "اكتب حرفين على الأقل",
        badPhone: "رقم الموبايل غير صحيح",
        submit: "أرسل الطلب",
        sending: "جاري الإرسال...",
        errorGeneric: "حصلت مشكلة وطلبك ماتبعتش. جرّب تاني بعد لحظات.",
        errorInvalid: "راجع البيانات وجرّب تاني.",
        fine: "بعد ٣ شهور تجدد بالسعر العادي لو حبيت تكمل، وإلا الصفحة تقف من غير أي رسوم.",
        doneTitle: "وصلنا طلبك 🎉",
        doneText: "هنراجعه ونتواصل معاك على واتساب قريباً لتجهيز صفحتك.",
        whatsapp: "تواصل معانا على واتساب",
        whatsappMessage: (plan: string, business: string) => `أهلاً، أنا قدمت طلب QR (باقة ${plan}) لنشاط "${business}".`,
        another: "إرسال طلب آخر",
        other: "English",
    },
    en: {
        badge: "First 3 months free",
        title: "Get a QR code for your business",
        subtitle: "Pick a plan and leave your details. We review your request and contact you on WhatsApp. No card, no commitment.",
        step: (n: number) => `Step ${n} of 2`,
        plan: "Choose your plan",
        popular: "Most popular",
        free3: "3 months free",
        then: "then",
        perYear: "/ year",
        next: "Next",
        back: "Back",
        change: "Change",
        yourPlan: "Plan",
        business: "Business name",
        contact: "Your name",
        phone: "Mobile number (WhatsApp)",
        phoneHelp: "We will contact you on it",
        email: "Email (optional)",
        type: "Type of business (restaurant, clinic, shop...)",
        links: "Social media or website links (optional)",
        notes: "Notes or preferred colors (optional)",
        required: "Required",
        badName: "At least 2 characters",
        badPhone: "Invalid mobile number",
        submit: "Send request",
        sending: "Sending...",
        errorGeneric: "Something went wrong and your request was not sent. Please try again shortly.",
        errorInvalid: "Please check your details and try again.",
        fine: "After 3 months you renew at the regular price if you want to continue; otherwise the page stops, with no charge.",
        doneTitle: "We got your request 🎉",
        doneText: "We will review it and contact you on WhatsApp soon to set up your page.",
        whatsapp: "Chat with us on WhatsApp",
        whatsappMessage: (plan: string, business: string) => `Hi, I just sent a QR request (${plan} plan) for "${business}".`,
        another: "Send another request",
        other: "العربية",
    },
};

/** The sales WhatsApp number used on the home page. */
const WHATSAPP = "201552455177";

/** The browser can only read NEXT_PUBLIC_ variables, so this mirrors QR_API_URL. */
const API_URL = (process.env.NEXT_PUBLIC_QR_API_URL ?? "").replace(/\/$/, "");

const EMPTY = { businessName: "", contactName: "", phone: "", email: "", businessType: "", links: "", notes: "" };
type Values = typeof EMPTY;

const PHONE = /^\+?[0-9\s-]{8,20}$/;

export default function SignupForm({ initialLanguage, reference }: { initialLanguage: Lang; reference: string }) {
    const [language, setLanguage] = useState<Lang>(initialLanguage);
    const [step, setStep] = useState<1 | 2>(1);
    const [plan, setPlan] = useState<PlanId>("professional");
    const [values, setValues] = useState(EMPTY);
    const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
    const [country, setCountry] = useState("EG");
    const [status, setStatus] = useState<"idle" | "sending" | "done" | "invalid" | "error">("idle");
    const [sent, setSent] = useState({ plan: "", business: "" });
    const [ready, setReady] = useState(false);

    const dir = language === "ar" ? "rtl" : "ltr";
    const cache = useMemo(() => createEmotionCache(dir === "rtl"), [dir]);
    const theme = useMemo(
        () => getTheme({ backgroundDefault: "#000", backgroundPaper: "#1b1a1a", primaryColor: "#2e7d32", secondaryColor: "#4f4e4e", dir }),
        [dir],
    );
    const text = t[language];

    useLayoutEffect(() => {
        document.documentElement.setAttribute("dir", dir);
        document.documentElement.setAttribute("lang", language);
        setReady(true);
    }, [dir, language]);

    // Prices follow the visitor's country, like the home page. Egypt is the default if the lookup fails.
    useEffect(() => {
        fetch("https://ipapi.co/json/")
            .then((res) => res.json())
            .then((data) => typeof data?.country === "string" && setCountry(data.country))
            .catch(() => undefined);
    }, []);

    if (!ready) return null;

    const price = (id: PlanId) => (country === "EG" ? `${PLANS[id].egp} EGP` : `$${PLANS[id].usd}`);
    const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setValues((v) => ({ ...v, [key]: e.target.value }));
    const blur = (key: keyof Values) => () => setTouched((x) => ({ ...x, [key]: true }));

    const errors: Partial<Record<keyof Values, string>> = {
        businessName: values.businessName.trim().length < 2 ? (values.businessName ? text.badName : text.required) : undefined,
        contactName: values.contactName.trim().length < 2 ? (values.contactName ? text.badName : text.required) : undefined,
        phone: !PHONE.test(values.phone.trim()) ? (values.phone ? text.badPhone : text.required) : undefined,
    };
    const valid = !errors.businessName && !errors.contactName && !errors.phone;
    const fieldProps = (key: "businessName" | "contactName" | "phone") => ({
        error: !!touched[key] && !!errors[key],
        helperText: touched[key] && errors[key] ? errors[key] : key === "phone" ? text.phoneHelp : undefined,
        onBlur: blur(key),
    });

    async function submit(e: FormEvent) {
        e.preventDefault();
        if (status === "sending") return;
        if (!valid) {
            setTouched({ businessName: true, contactName: true, phone: true });
            return;
        }
        setStatus("sending");
        try {
            const res = await fetch(`${API_URL}/public/signup-requests`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values, plan, language, country, ref: reference }),
            });
            if (res.ok) {
                setSent({ plan: PLANS[plan].name, business: values.businessName.trim() });
                setStatus("done");
                setValues(EMPTY);
                setTouched({});
                setStep(1);
            } else setStatus(res.status === 400 ? "invalid" : "error");
        } catch {
            setStatus("error");
        }
    }

    const NextIcon = dir === "rtl" ? ArrowBack : ArrowForward;
    const BackIcon = dir === "rtl" ? ArrowForward : ArrowBack;

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="sm" sx={{ py: 4, overflowX: "clip" }}>
                    <Stack spacing={3}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                            <Chip icon={<QrCode2 />} label={text.badge} color="primary" />
                            <Button size="small" onClick={() => setLanguage(language === "ar" ? "en" : "ar")}>
                                {text.other}
                            </Button>
                        </Stack>

                        <Box>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.4 }}>
                                {text.title}
                            </Typography>
                            <Typography color="text.secondary">{text.subtitle}</Typography>
                        </Box>

                        {status === "done" ? (
                            <Paper sx={{ p: 4, textAlign: "center" }}>
                                <CheckCircle color="primary" sx={{ fontSize: 56, mb: 1 }} />
                                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                                    {text.doneTitle}
                                </Typography>
                                <Typography color="text.secondary" sx={{ mb: 3 }}>
                                    {text.doneText}
                                </Typography>
                                <Stack spacing={1.5}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        startIcon={<WhatsApp />}
                                        component="a"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text.whatsappMessage(sent.plan, sent.business))}`}
                                    >
                                        {text.whatsapp}
                                    </Button>
                                    <Button onClick={() => setStatus("idle")}>{text.another}</Button>
                                </Stack>
                            </Paper>
                        ) : (
                            <Box component="form" onSubmit={submit} noValidate>
                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            {text.step(step)}
                                        </Typography>
                                        <LinearProgress variant="determinate" value={step * 50} sx={{ mt: 0.5, borderRadius: 1, height: 6 }} />
                                    </Box>

                                    {step === 1 ? (
                                        <>
                                            <Typography sx={{ fontWeight: 700 }}>{text.plan}</Typography>
                                            <Stack spacing={1.5} role="radiogroup" aria-label={text.plan}>
                                                {(Object.keys(PLANS) as PlanId[]).map((id) => {
                                                    const selected = plan === id;
                                                    return (
                                                        <Paper
                                                            key={id}
                                                            role="radio"
                                                            aria-checked={selected}
                                                            tabIndex={0}
                                                            onClick={() => setPlan(id)}
                                                            onKeyDown={(e) => (e.key === " " || e.key === "Enter") && (e.preventDefault(), setPlan(id))}
                                                            sx={{
                                                                p: 2,
                                                                cursor: "pointer",
                                                                border: 2,
                                                                borderColor: selected ? "primary.main" : "divider",
                                                                bgcolor: selected ? "action.selected" : undefined,
                                                                transition: "border-color .15s, background-color .15s",
                                                            }}
                                                        >
                                                            <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
                                                                <Box
                                                                    sx={{
                                                                        mt: 0.4,
                                                                        width: 20,
                                                                        height: 20,
                                                                        flexShrink: 0,
                                                                        borderRadius: "50%",
                                                                        border: 2,
                                                                        borderColor: selected ? "primary.main" : "text.disabled",
                                                                        display: "grid",
                                                                        placeItems: "center",
                                                                    }}
                                                                >
                                                                    {selected && <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "primary.main" }} />}
                                                                </Box>
                                                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                                                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                                                                        <Typography sx={{ fontWeight: 800 }}>{PLANS[id].name}</Typography>
                                                                        {PLANS[id].featured && <Chip label={text.popular} size="small" color="primary" variant="outlined" />}
                                                                    </Stack>
                                                                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                                                                        <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
                                                                            {text.free3}
                                                                        </Box>{" "}
                                                                        <Box component="span" sx={{ color: "text.secondary" }}>
                                                                            · {text.then} {price(id)} {text.perYear}
                                                                        </Box>
                                                                    </Typography>
                                                                    <Stack spacing={0.4} sx={{ mt: 1.25 }}>
                                                                        {PLANS[id].features[language].map((feature) => (
                                                                            <Stack key={feature} direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                                                                                <CheckCircle sx={{ fontSize: 15 }} color="primary" />
                                                                                <Typography variant="caption" color="text.secondary">
                                                                                    {feature}
                                                                                </Typography>
                                                                            </Stack>
                                                                        ))}
                                                                    </Stack>
                                                                </Box>
                                                            </Stack>
                                                        </Paper>
                                                    );
                                                })}
                                            </Stack>
                                            <Button variant="contained" size="large" endIcon={<NextIcon />} onClick={() => setStep(2)}>
                                                {text.next}
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Paper variant="outlined" sx={{ p: 1.5 }}>
                                                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                                    <Typography variant="body2">
                                                        {text.yourPlan}: <b>{PLANS[plan].name}</b> · {text.free3}
                                                    </Typography>
                                                    <Button size="small" onClick={() => setStep(1)}>
                                                        {text.change}
                                                    </Button>
                                                </Stack>
                                            </Paper>

                                            <Stack spacing={2} sx={{ position: "relative" }}>
                                                <TextField label={text.business} value={values.businessName} onChange={set("businessName")} required fullWidth autoFocus {...fieldProps("businessName")} slotProps={{ htmlInput: { maxLength: 100 } }} />
                                                <TextField label={text.contact} value={values.contactName} onChange={set("contactName")} required fullWidth autoComplete="name" {...fieldProps("contactName")} slotProps={{ htmlInput: { maxLength: 100 } }} />
                                                <TextField
                                                    label={text.phone}
                                                    value={values.phone}
                                                    onChange={set("phone")}
                                                    required
                                                    fullWidth
                                                    type="tel"
                                                    autoComplete="tel"
                                                    {...fieldProps("phone")}
                                                    slotProps={{ htmlInput: { dir: "ltr", maxLength: 20, inputMode: "tel" } }}
                                                />
                                                <TextField label={text.email} value={values.email} onChange={set("email")} fullWidth type="email" autoComplete="email" slotProps={{ htmlInput: { dir: "ltr", maxLength: 120 } }} />
                                                <TextField label={text.type} value={values.businessType} onChange={set("businessType")} fullWidth slotProps={{ htmlInput: { maxLength: 100 } }} />
                                                <TextField label={text.links} value={values.links} onChange={set("links")} fullWidth multiline minRows={2} slotProps={{ htmlInput: { dir: "ltr", maxLength: 1000 } }} />
                                                <TextField label={text.notes} value={values.notes} onChange={set("notes")} fullWidth multiline minRows={2} slotProps={{ htmlInput: { maxLength: 1000 } }} />
                                            </Stack>

                                            {status === "invalid" && <Alert severity="warning">{text.errorInvalid}</Alert>}
                                            {status === "error" && <Alert severity="error">{text.errorGeneric}</Alert>}

                                            <Stack direction="row" spacing={1.5}>
                                                <Button size="large" startIcon={<BackIcon />} onClick={() => setStep(1)} disabled={status === "sending"}>
                                                    {text.back}
                                                </Button>
                                                <Button type="submit" variant="contained" size="large" fullWidth disabled={status === "sending"}>
                                                    {status === "sending" ? text.sending : text.submit}
                                                </Button>
                                            </Stack>
                                            <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
                                                {text.fine}
                                            </Typography>
                                        </>
                                    )}
                                </Stack>
                            </Box>
                        )}
                    </Stack>
                </Container>
            </ThemeProvider>
        </CacheProvider>
    );
}
