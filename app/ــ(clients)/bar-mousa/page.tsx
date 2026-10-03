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
import Footer from "@/components/Footer";
import PepoGallery from "@/components/PepoGallery";
import SaveContact from "@/components/AddToContact";

import Description from "@/components/Description";

/* ---------------- page component ---------------- */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const Page = () => {
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
        secondaryColor: data.secondColor,
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
                        <SaveContact
                            links={data.socials.map((social) => social.link)}
                            name={data.name}
                            phoneNumbers={data.branches.map((branch) => branch.numbers.map((number) => number.number)).flat()}
                            photoUrl={siteUrl + data.id + "/logo.webp"}
                            role={data.role}
                        />

                        <Description description={data.description} />

                        {/* SOCIAL */}
                        <SocialMediaLinks links={data.socials} />
                        <PepoGallery
                            tabs={
                                [
                                    {
                                        title: "بار موسى",
                                        images: data.menu6
                                    },
                                    {
                                        title: "بيتزا بيبو",
                                        images: data.menu2,
                                        id: "pizza-pepo"
                                    },
                                    {
                                        title: "أصناف",
                                        images: data.menu3,
                                    },
                                    {
                                        title: "حلو X حلو",
                                        images: data.menu4,
                                    },
                                    {
                                        title: "كبدة تو جو",
                                        images: data.menu5,
                                    },
                                    {
                                        title: "شواية",
                                        images: data.menu6,
                                    },
                                ]
                            }
                            id={data.id}
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

export default Page;
