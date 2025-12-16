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
import FancyboxCarousel from "@/components/FanceBox";


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
                    <Stack mt={4} px={3}>
                        <FancyboxCarousel
                            images={
                                [
                                    {
                                        thumb: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
                                        full: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
                                    },
                                    {
                                        thumb: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                                        full: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                                    },
                                    {
                                        thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                        full: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                    },
                                    {
                                        thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                        full: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                    },
                                    {
                                        thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                        full: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                    },
                                    {
                                        thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                        full: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                    },
                                    {
                                        thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                        full: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                    },
                                    {
                                        thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                        full: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                    },
                                    {
                                        thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                        full: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                    },
                                    {
                                        thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                        full: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                                    },
                                ]
                            }
                        />
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
