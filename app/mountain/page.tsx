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
import { ourClients } from "@/components/Customers";
import SaveContact from "@/components/AddToContact";

import Description from "@/components/Description";

const folderName = "mountain";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

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
        secondaryColor: data.secondColor,
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

                    <Stack spacing={4} my={4}>
                        {/* SOCIAL */}
                        <SaveContact
                            links={data.socials.map((social) => social.link)}
                            name={data.name}
                            phoneNumbers={data.branches.map((branch) => branch.numbers.map((number) => number.number)).flat()}
                            photoUrl={siteUrl + data.id + "/logo.webp"}
                            role={data.role}
                        />
                        <Description description={data.description[language as "ar" | "en"]} />
                        <SocialMediaLinks links={data.socials} />


                        <FancyboxCarousel
                            images={
                                ourClients.map((client) => ({
                                    thumb: `${client.src}`,
                                    full: `${client.src}`,
                                }))
                            }
                            height={300}
                            variant="circle"
                            title={theme.direction === "rtl" ? "عملاؤنا" : "Our Clients"}
                        />

                        {/* BRANCHES (NESTED THEME) */}
                        <BranchLocations
                            branches={data.branches}
                            splitCode={data.countryCode}
                        />
                    </Stack>
                </Stack>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default Page;
