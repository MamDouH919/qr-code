import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";

export const Overlay = styled(Box)({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.2)",
});

export const Bg = styled(Stack)({
  backgroundColor: "#199d0d",
  height: 40,
  borderRadius: 990,
  position: "relative"
});

export const AvatarStyled = styled(Avatar)({
  position: "absolute",
  right: "0px",
  top: "-5px",
  width: 50,
  height: 50,
  borderRadius: "50%",
  backgroundColor: "#fff",
});

const text = {
  ar: "الرد الآلي على واتساب",
  en: "Auto Reply on WhatsApp"
}

const AutoReplyWhatsapp = ({ language, number }: { language: string, number: string }) => {
  return (
    <Link href={`https://wa.me/${number}`} target="_blank" rel="noopener noreferrer">
      <Box>
        <Container>
          <Bg justifyContent={"center"} px={2}>
            <AvatarStyled>
              <Image src="/auto-reply.png" alt="AutoReplyWhatsapp" width={37} height={37} />
            </AvatarStyled>

            <Typography>
              {text[language as "ar" | "en"]}
            </Typography>
          </Bg>
        </Container>
      </Box>
    </Link>
  )
}

export default AutoReplyWhatsapp