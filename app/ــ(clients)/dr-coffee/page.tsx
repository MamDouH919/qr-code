"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { CacheProvider } from "@emotion/react";
import {
    CssBaseline,
    Stack,
    ThemeProvider,
} from "@mui/material";

import createEmotionCache from "@/lib/create-emotion-cache";
import getTheme from "@/lib/theme";

import data from "./data.json";
import SocialMediaLinks from "@/components/Social";
import BranchLocations from "@/components/_branches";
import { BackgroundContainer, BackgroundImage, Overlay, ProfileImage, ProfileImageContainer, ProfileName, Spacer } from "@/components/PageStyles";
import LanguageIcon from "@/components/LanguageIcon";
import GalleryCarousel from "@/components/FanceBox";
import Footer from "@/components/Footer";

/* ---------------- styled components ---------------- */


/* ---------------- page component ---------------- */

const folderName = "dr-coffee";

const DrCoffeePage = () => {
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
        secondaryColor: data.color,
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
                />
                }
                <Stack spacing={0}>
                    {/* HEADER */}
                    <BackgroundContainer>
                        <BackgroundImage backgroundimage={`/${folderName}/logo.webp`}>
                            <Overlay />
                        </BackgroundImage>

                        <ProfileImageContainer>
                            <ProfileImage
                                src={`/${folderName}/logo.webp`}
                                alt="Profile"
                            />
                        </ProfileImageContainer>
                    </BackgroundContainer>
                    <Spacer />

                    {/* NAME */}
                    <ProfileName>{data.name}</ProfileName>

                    <Stack spacing={4} mt={4}>
                        {/* SOCIAL */}
                        <SocialMediaLinks links={data.socials} />

                        <GalleryCarousel
                            images={data.menu1.map((image) => ({
                                thumb: data.id + image,
                                full: data.id + image,
                            }))}
                            height={500}
                            title="المنيو"
                        />


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

export default DrCoffeePage;
