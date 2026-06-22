import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

export const Overlay = styled(Box)({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.2)",
});

export const Bg = styled(Stack)({
  background: "linear-gradient(135deg, #25d366 0%, #199d0d 100%)",
  minHeight: 56,
  borderRadius: 990,
  position: "relative",
  boxShadow: "0 6px 18px rgba(25, 157, 13, 0.35)",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 24px rgba(25, 157, 13, 0.45)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
});

export const AvatarStyled = styled(Avatar)({
  width: 44,
  height: 44,
  borderRadius: "50%",
  backgroundColor: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
  flexShrink: 0,
});

const text = {
  ar: "الرد الآلي على واتساب",
  en: "Auto Reply on WhatsApp"
}

const AutoReplyWhatsapp = ({ language, number }: { language: string, number: string }) => {
  const isArabic = language === "ar";
  const Chevron = isArabic ? ChevronLeft : ChevronRight;

  return (
    <Link href={`https://wa.me/${number}`} target="_blank" rel="noopener noreferrer">
      <Box>
        <Container>
          <Bg
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ px: 1, py: 0.75 }}
          >
            <AvatarStyled>
              <Image src="/auto-reply.png" alt="AutoReplyWhatsapp" width={32} height={32} />
            </AvatarStyled>

            <Typography
              sx={{
                flex: 1,
                color: "#fff",
                fontWeight: 700,
                fontSize: { xs: "0.95rem", sm: "1.05rem" },
                letterSpacing: "0.01em",
                lineHeight: 1.2,
              }}
            >
              {text[language as "ar" | "en"]}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.22)",
                color: "#fff",
                flexShrink: 0,
                animation: "nudge 1.6s ease-in-out infinite",
                "@keyframes nudge": {
                  "0%, 100%": { transform: "translateX(0)" },
                  "50%": { transform: `translateX(${isArabic ? "-3px" : "3px"})` },
                },
              }}
            >
              <Chevron fontSize="small" />
            </Box>
          </Bg>
        </Container>
      </Box>
    </Link>
  )
}

export default AutoReplyWhatsapp