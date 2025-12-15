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
import {
    BackgroundContainer,
    BackgroundImage,
    Overlay,
    ProfileImage,
    ProfileImageContainer,
    ProfileName,
    Spacer
} from "@/components/PageStyles";
import BranchLocations from "@/components/_branches";
import LanguageIcon from "@/components/LanguageIcon";


const folderName = "mountain";

const Page = () => {
    const [ready, setReady] = useState(false);
    const [language, setLanguage] = useState("ar");

    // RTL Emotion cache
    const cache = useMemo(() => createEmotionCache(language === "ar"), [language]);

    useLayoutEffect(() => {
        document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
        setReady(true);
    }, [language]);

    const theme = useMemo(() => getTheme({
        primaryColor: data.color,
        secondaryColor: "#000",
        dir: language === "ar" ? "rtl" : "ltr"
    }), [language]);

    if (!ready) return null;

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <LanguageIcon 
                    handleChangeLanguage={setLanguage}
                    language={language === "ar" ? "en" : "ar"}
                />

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

                    {/* SOCIAL */}
                    <Stack mt={4}>
                        <SocialMediaLinks links={data.socials} />
                    </Stack>
                    {/* BRANCHES (NESTED THEME) */}
                    <BranchLocations
                        branches={data.branches}
                        splitCode={data.countryCode}
                    />
                </Stack>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default Page;
