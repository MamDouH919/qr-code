"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";

import createEmotionCache from "@/lib/create-emotion-cache";
import getTheme from "@/lib/theme";
import type { BackendClient } from "@/lib/backend";

import AdSlot from "@/components/AdSlot";
import Apps from "@/components/Apps";
import AutoReplyWhatsapp from "@/components/AutoReplyWhatsapp";
import Description from "@/components/Description";
import GalleryCarousel from "@/components/FanceBox";
import PepoGallery from "@/components/PepoGallery";
import Footer from "@/components/Footer";
import LanguageIcon from "@/components/LanguageIcon";
import SaveContact from "@/components/AddToContact";
import SocialMediaLinks from "@/components/Social";
import BranchLocations from "@/components/_branches";
import {
    BackgroundContainer,
    BackgroundImage,
    Overlay,
    ProfileImage,
    ProfileImageContainer,
    ProfileName,
    Spacer,
} from "@/components/PageStyles";
import DrDaliaForm from "./DrDaliaForm";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const ARABIC = /[؀-ۿ]/;

type Lang = "ar" | "en";

/** Text for the current language; a plain string is shown as it is. */
function pick(value: BackendClient["description"], language: Lang): string {
    if (typeof value === "string") return value;
    return (value?.[language] || value?.ar || value?.en || "") as string;
}

/**
 * The one landing page every client shares, drawn from what the dashboard stores.
 * Sections appear only when the client has content for them.
 */
export default function ClientLanding({ data, slug }: { data: BackendClient; slug: string }) {
    // Pages with Arabic content open right-to-left; English-only ones left-to-right.
    const startLanguage: Lang = useMemo(
        () => (ARABIC.test(`${data.name}${pick(data.description, "ar")}${data.role}`) || data.multiLanguage ? "ar" : "en"),
        [data],
    );
    const [ready, setReady] = useState(false);
    const [language, setLanguage] = useState<Lang>(startLanguage);

    const dir = language === "ar" ? "rtl" : "ltr";
    const cache = useMemo(() => createEmotionCache(dir === "rtl"), [dir]);

    useLayoutEffect(() => {
        document.documentElement.setAttribute("dir", dir);
        setReady(true);
    }, [dir]);

    const theme = useMemo(
        () => getTheme({ primaryColor: data.color, secondaryColor: data.secondColor || "#000", dir }),
        [data.color, data.secondColor, dir],
    );

    if (!ready) return null;

    const { logo, background, profileImage } = data.images;
    const cover = background ?? logo;
    const avatar = profileImage || logo;
    const phoneNumbers = data.branches.flatMap((b) => b.numbers.map((n) => n.number));
    const galleries = data.galleries.filter((g) => g.images.length > 0);
    const hasApps = !!(data.apps?.ios || data.apps?.android);

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {data.multiLanguage && (
                    <LanguageIcon handleChangeLanguage={setLanguage as (l: string) => void} language={language === "ar" ? "en" : "ar"} />
                )}

                <Stack spacing={0}>
                    <BackgroundContainer>
                        <BackgroundImage backgroundimage={cover}>
                            <Overlay />
                        </BackgroundImage>
                        <ProfileImageContainer>
                            <ProfileImage src={avatar} alt={data.name} />
                        </ProfileImageContainer>
                    </BackgroundContainer>
                    <Spacer />

                    <ProfileName>{data.name}</ProfileName>

                    <Stack spacing={4} mt={4}>
                        {phoneNumbers.length > 0 && (
                            <SaveContact
                                links={data.socials.map((s) => s.link)}
                                name={data.name}
                                phoneNumbers={phoneNumbers}
                                photoUrl={logo || (siteUrl ? `${siteUrl}${data.id}/logo.webp` : "")}
                                role={data.role}
                            />
                        )}

                        <Description description={pick(data.description, language)} />
                        {slug === "dr-dalia" && <DrDaliaForm />}
                        {data.autoReplyWhatsapp && <AutoReplyWhatsapp language={language} number={data.autoReplyWhatsapp} />}

                        <SocialMediaLinks links={data.socials} />

                        {hasApps && <Apps ios={data.apps.ios ?? ""} android={data.apps.android ?? ""} />}

                        {galleries.length === 1 && (
                            <GalleryCarousel
                                images={galleries[0].images.map((src) => ({ thumb: src, full: src }))}
                                height={500}
                                title={galleries[0].title || undefined}
                            />
                        )}
                        {galleries.length > 1 && (
                            // id="" because the gallery images are already full URLs.
                            <PepoGallery id="" tabs={galleries.map((g) => ({ title: g.title, images: g.images }))} />
                        )}

                        {data.ads.map((ad) => (
                            <AdSlot key={ad.id} ad={ad} />
                        ))}

                        {data.branches.length > 0 && <BranchLocations branches={data.branches} splitCode={data.countryCode} />}

                        <Footer />
                    </Stack>
                </Stack>
            </ThemeProvider>
        </CacheProvider>
    );
}
