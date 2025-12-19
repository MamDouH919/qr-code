import React from 'react';
import {
    Button,
    Stack,
    Paper,
    useTheme,
    Container,
    Box
} from '@mui/material';
import {
    Facebook,
    Instagram,
    LinkedIn,
    YouTube,
    Language,
    WhatsApp,
    X
} from '@mui/icons-material';

interface SocialMediaLink {
    code: string;
    link: string;
}

// TikTok Icon
const TikTokIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z" />
    </svg>
);

type SocialConfig = {
    code: "FB" | "IG" | "X" | "LI" | "YT" | "TK" | "WG" | "WS";
    name: string;
    icon: React.ReactNode;
    gradient: string;
    nameAr: string;
};

const SOCIAL_CONFIG: SocialConfig[] = [
    {
        code: 'FB',
        name: 'Facebook',
        nameAr: 'فيسبوك',
        icon: <Facebook />,
        gradient: 'linear-gradient(135deg, #1877F2, #0D5DBF)'
    },
    {
        code: 'IG',
        name: 'Instagram',
        nameAr: 'إنستغرام',
        icon: <Instagram />,
        gradient:
            'linear-gradient(135deg, #F58529, #DD2A7B, #8134AF, #515BD4)'
    },
    {
        code: 'X',
        name: 'X',
        nameAr: 'X',
        icon: <X />,
        gradient: 'linear-gradient(135deg, #000000, #000000)'
    },
    {
        code: 'LI',
        name: 'LinkedIn',
        nameAr: 'لينكد ان',
        icon: <LinkedIn />,
        gradient: 'linear-gradient(135deg, #0077B5, #005885)'
    },
    {
        code: 'YT',
        name: 'YouTube',
        nameAr: 'يوتيوب',
        icon: <YouTube />,
        gradient: 'linear-gradient(135deg, #FF0000, #CC0000)'
    },
    {
        code: 'TK',
        name: 'TikTok',
        nameAr: 'تيكتوك',
        icon: <TikTokIcon />,
        gradient:
            'linear-gradient(135deg, #000000, #EE1D52, #69C9D0)'
    },
    {
        code: 'WG',
        name: 'WhatsApp Group',
        nameAr: 'مجموعة واتس اب',
        icon: <WhatsApp />,
        gradient: 'linear-gradient(135deg, #25D366, #128C7E)'
    },
    {
        code: 'WS',
        name: 'Website',
        nameAr: 'موقع الويب',
        icon: <Language />,
        gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)'
    }
];

export default function SocialMediaLinks({
    links
}: {
    links: SocialMediaLink[];
}) {
    const theme = useTheme();
    const isArabic = theme.direction === 'rtl';
    const linksMap = React.useMemo(
        () =>
            Object.fromEntries(
                links.map(l => [
                    l.code,
                    {
                        link: l.link
                    }
                ])
            ),
        [links]
    );


    const availableLinks = SOCIAL_CONFIG
        .filter(social => linksMap[social.code])
        .map(social => ({
            ...social,
            url: linksMap[social.code].link   // ← from API
        }));

    return (
        <Box>
            <Container>
                <Stack spacing={2}>
                    {availableLinks.map((social, index) => (
                        <Button
                            key={index}
                            component="a"
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            endIcon={social.icon}
                            fullWidth
                            sx={{
                                backgroundImage: social.gradient,
                                backgroundColor: 'transparent',
                                color: '#fff',

                                height: 64,
                                px: 3,
                                fontSize: '1.05rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                borderRadius: 999,

                                justifyContent: 'space-between',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.35)',

                                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,

                                '&:hover': {
                                    backgroundImage: social.gradient,
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
                                },

                                '&:active': {
                                    transform: 'translateY(0)',
                                },
                                '& svg': {
                                    fontSize: "25px !important",
                                },

                                '@keyframes fadeInUp': {
                                    from: { opacity: 0, transform: 'translateY(24px)' },
                                    to: { opacity: 1, transform: 'translateY(0)' }
                                }
                            }}
                        >
                            {isArabic ? social.nameAr : social.name}
                        </Button>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
}
