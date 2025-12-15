"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { CacheProvider } from "@emotion/react";
import {
    Box,
    CssBaseline,
    Stack,
    ThemeProvider,
    Typography,
    useTheme,
    createTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import createEmotionCache from "@/lib/create-emotion-cache";
import getTheme from "@/lib/theme";

import data from "./data.json";
import SocialMediaLinks from "@/components/Social";
import BranchLocations from "@/components/_branches";

/* ---------------- styled components ---------------- */

const BackgroundContainer = styled(Box)({
    position: "relative",
});

const BackgroundImage = styled(Box)<{ backgroundimage: string }>(
    ({ backgroundimage }) => ({
        height: 300,
        width: "100%",
        backgroundImage: `url('${backgroundimage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(4px)",
    })
);

const Overlay = styled(Box)({
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
});

const ProfileImageContainer = styled(Box)({
    position: "absolute",
    left: "50%",
    bottom: 0,
    transform: "translate(-50%, 50%)",
    height: 200,
    width: 200,
});

const ProfileImage = styled("img")({
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 10px 15px rgba(0,0,0,0.15)",
});

const Spacer = styled(Box)({
    height: 120,
});

const ProfileName = styled(Typography)({
    color: "#fff",
    fontSize: "1.875rem",
    fontWeight: 700,
    textAlign: "center",
});
/* ---------------- page component ---------------- */

const Page = () => {
    const [ready, setReady] = useState(false);

    // RTL Emotion cache
    const cache = useMemo(() => createEmotionCache(true), []);

    useLayoutEffect(() => {
        document.documentElement.setAttribute("dir", "rtl");
        setReady(true);
    }, []);

    const theme = useMemo(() => getTheme({
        primaryColor: "#6999d5",
        secondaryColor: "#000",
        dir: "rtl"
    }), []);

    if (!ready) return null;

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <Stack spacing={0}>
                    {/* HEADER */}
                    <BackgroundContainer>
                        <BackgroundImage backgroundimage="/arab-clinic/profile.jpg">
                            <Overlay />
                        </BackgroundImage>

                        <ProfileImageContainer>
                            <ProfileImage
                                src="/arab-clinic/profile.jpg"
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
