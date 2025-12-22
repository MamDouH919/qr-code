"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { CacheProvider } from "@emotion/react";
import {
    CssBaseline,
    Stack,
    ThemeProvider,
    Typography,
} from "@mui/material";

import createEmotionCache from "@/lib/create-emotion-cache";
import getTheme from "@/lib/theme";

import data from "./data.json";
import SocialMediaLinks from "@/components/Social";
import BranchLocations from "@/components/_branches";
import { BackgroundContainer, BackgroundImage, Overlay, ProfileImage, ProfileImageContainer, ProfileName, Spacer } from "@/components/PageStyles";
import LanguageIcon from "@/components/LanguageIcon";
import Footer from "@/components/Footer";
import Description from "@/components/Description";
import SaveContact from "@/components/AddToContact";
/* ---------------- styled components ---------------- */


/* ---------------- page component ---------------- */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const ArabClinicPage = () => {
    const [ready, setReady] = useState(false);
    const [language, setLanguage] = useState("ar");

    // RTL Emotion cache
    const dir = language === "ar" ? "rtl" : "ltr";
    const cache = useMemo(() => createEmotionCache(dir === "rtl"), [language]);

    useLayoutEffect(() => {
        document.documentElement.setAttribute("dir", dir);
        setReady(true);
    }, [language]);

    const theme = useMemo(() => getTheme({
        primaryColor: data.color,
        secondaryColor: "#000",
        dir: dir
    }), [language]);

    if (!ready) return null;

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {data.multiLanguage && <LanguageIcon
                    handleChangeLanguage={setLanguage}
                    language={language === "ar" ? "en" : "ar"}
                />}

                <Stack spacing={0}>
                    {/* HEADER */}
                    <BackgroundContainer>
                        <BackgroundImage backgroundimage={`/${data.id}/logo.webp`}>
                            <Overlay />
                        </BackgroundImage>

                        <ProfileImageContainer>
                            <ProfileImage
                                src={`/${data.id}/logo.webp`}
                                alt="Profile"
                            />
                        </ProfileImageContainer>
                    </BackgroundContainer>
                    <Spacer />

                    {/* NAME */}
                    <ProfileName>{data.name}</ProfileName>
                    <Stack spacing={4} mt={4}>
                        <Description description={data.description} />
                        {/* SOCIAL */}
                        <SocialMediaLinks links={data.socials} />

                        {/* BRANCHES (NESTED THEME) */}
                        <BranchLocations
                            branches={data.branches}
                            splitCode={data.countryCode}
                        />
                        <Footer />
                    </Stack>
                </Stack>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default ArabClinicPage;
