import { Button } from "@mui/material";
import { Facebook } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";
import { WhatsApp } from "@mui/icons-material";

interface SocialButtonProps {
    name: string;
    icon: React.ReactNode;
    url: string;
    gradient: string;
    delay?: number;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
    name,
    icon,
    url,
    gradient,
    delay = 0,
}) => {
    return (
        <Button
            variant="contained"
            fullWidth
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={icon}
            sx={{
                background: gradient,
                color: "white",
                padding: "14px 24px",
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                position: "relative",
                overflow: "hidden",
                justifyContent: "flex-start",
                animation: `fadeInUp 0.6s ease-out backwards ${delay}s`,
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "rgba(255, 255, 255, 0.2)",
                    transition: "left 0.5s",
                },
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                    "&::before": {
                        left: "100%",
                    },
                },
                "&:active": {
                    transform: "translateY(-1px)",
                },
                "@keyframes fadeInUp": {
                    from: { opacity: 0, transform: "translateY(30px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                },
            }}
        >
            {name}
        </Button>
    );
};

export const FacebookComponent = ({
    name,
    url
}: {
    name: string;
    url: string;
}) => (
    <SocialButton
        name={name}
        icon={<Facebook  />}
        url={url}
        gradient="linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%)"
    />
);


export const InstagramComponent = () => (
    <SocialButton
        name="Instagram"
        icon={<Instagram />}
        url="https://instagram.com"
        gradient="linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"
    />
);

const TikTokIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02..." />
    </svg>
);

export const TikTokComponent = () => (
    <SocialButton
        name="TikTok"
        icon={<TikTokIcon />}
        url="https://tiktok.com"
        gradient="linear-gradient(135deg, #000000 0%, #ee1d52 50%, #69c9d0 100%)"
    />
);

export const WhatsAppComponent = () => (
    <SocialButton
        name="WhatsApp Group"
        icon={<WhatsApp />}
        url="https://chat.whatsapp.com/your-group-invite-link"
        gradient="linear-gradient(135deg, #25D366 0%, #128C7E 100%)"
    />
);
