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
import SaveContact from "@/components/AddToContact";

import Description from "@/components/Description";
import DrDaliaForm from "@/components/DrDaliaForm";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

/* ---------------- styled components ---------------- */


/* ---------------- page component ---------------- */

const ArabClinicPage = () => {
    const [ready, setReady] = useState(false);
    const [language, setLanguage] = useState("ar");

    // RTL Emotion cache
    const cache = useMemo(() => createEmotionCache(false), []);

    useLayoutEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        setReady(true);
    }, []);

    const theme = useMemo(() => getTheme({
        primaryColor: data.color,
        secondaryColor: "#000",
        dir: "ltr"
    }), []);

    if (!ready) return null;

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Stack spacing={0}>
                    {/* HEADER */}
                    <BackgroundContainer>
                        <BackgroundImage backgroundimage={`/${data.id}/bg.webp`} blur={"none"}>
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
                        <DrDaliaForm />
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
