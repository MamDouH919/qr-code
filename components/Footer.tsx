import { Box, Typography, Container, useTheme, Paper } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const translations = {
    ar: {
        copyright: 'حقوق النشر © {year} Mountain. كل الحقوق محفوظة.',
        forQrPrice: 'للاستعلام علي الأسعار والتفاصيل',
        homepage: 'الصفحة الرئيسية'
    },
    en: {
        copyright: '© {year} Mountain. All rights reserved.',
        forQrPrice: 'For QR Prices and Details',
        homepage: 'Home page'
    },
};

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const theme = useTheme();

    const t = theme.direction === 'rtl' ? translations.ar : translations.en;

    return (
        <Paper sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        {/* Logo */}
                        <Box
                            sx={{
                                position: 'relative',
                                width: 40,
                                height: 40,
                            }}
                        >
                            <Link href={"https://mountain-egy.site"} target="_blank" rel="noopener noreferrer">
                                <Image
                                    src="/mountain/logo.webp"
                                    alt="Company Logo"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </Link>
                        </Box>

                        {/* Copyright */}
                        <Typography variant="body2" color="text.secondary" align="center">
                            {t.forQrPrice}: <Typography
                                color='primary'
                                component={Link} href={"/"} target="_blank" rel="noopener noreferrer">
                                {t.homepage}
                            </Typography>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center">
                            {t.copyright.replace('{year}', String(currentYear))}
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Paper>
    );
};

export default Footer;
