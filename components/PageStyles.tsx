import {
    Box,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const BackgroundContainer = styled(Box)({
    position: "relative",
});

export const BackgroundImage = styled(Box)<{ backgroundimage: string, blur?: string }>(
    ({ backgroundimage, blur = "blur(10px)" }) => ({
        height: 300,
        width: "100%",
        backgroundImage: `url('${backgroundimage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: blur,
    })
);

export const Overlay = styled(Box)({
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
});

export const ProfileImageContainer = styled(Box)({
    position: "absolute",
    left: "50%",
    bottom: 0,
    transform: "translate(-50%, 50%)",
    height: 200,
    width: 200,
});

export const ProfileImage = styled("img")({
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 10px 15px rgba(0,0,0,0.15)",
});

export const Spacer = styled(Box)({
    height: 120,
});

export const ProfileName = styled(Typography)({
    color: "#fff",
    fontSize: "1.875rem",
    fontWeight: 700,
    textAlign: "center",
});