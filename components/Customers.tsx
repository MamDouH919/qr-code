import React from 'react';
import { Box, Container, Typography, styled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

// Styled Components
const ScrollContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    padding: theme.spacing(4, 0),
    '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100px',
        zIndex: 2,
        pointerEvents: 'none',
        [theme.breakpoints.down('sm')]: {
            width: '40px',
        },
    },
    '&::before': {
        left: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%)',
    },
    '&::after': {
        right: 0,
        background: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%)',
    },
}));

const ScrollTrack = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '24px',
    width: 'fit-content',
    animation: 'scroll 40s linear infinite',
    '&:hover': {
        animationPlayState: 'paused',
    },
    [theme.breakpoints.down('sm')]: {
        gap: '16px',
        animation: 'scroll 30s linear infinite',
    },
    '@keyframes scroll': {
        '0%': {
            transform: 'translateX(0)',
        },
        '100%': {
            transform: 'translateX(-50%)',
        },
    },
}));

const ImageCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '300px',
    height: '200px',
    flexShrink: 0,
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    },
    [theme.breakpoints.down('md')]: {
        width: '250px',
        height: '170px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '200px',
        height: '140px',
    },
}));

// Sample customer images data
export const ourClients = [
    {
        id: "arab-clinic",
        name: "Arab Clinic",
        src: "/arab-clinic/logo.webp",
    },
    {
        id: "dr-coffee",
        name: "Dr Coffee",
        src: "/dr-coffee/logo.webp",
    },
    {
        id: "pizza-pepo",
        name: "Pizza Pepo",
        src: "/pizza-pepo/logo.webp",
    },
    {
        id: "jeep-city",
        name: "Jeep City",
        src: "/jeep-city/logo.webp",
    },
    {
        id: "steakburger",
        name: "Steak Burger",
        src: "/steakburger/logo.webp",
    },
    {
        id: "shaebiaat-zad",
        name: "شعبيات زاد",
        src: "/shaebiaat-zad/logo.webp",
    },
    {
        id: "dr-dalia",
        name: "Dr. Dalia A.abdulrahman",
        src: "/dr-dalia/logo.webp",
    },
    {
        id: "mohamed-lashen",
        name: "د. محمد لاشين",
        src: "/mohamed-lashen/logo.webp",
    },
    {
        id: "3baky",
        name: "3baky",
        src: "/3baky/logo.webp",
    },
    {
        id: "elite-bridge",
        name: "Elite Bridge",
        src: "/elite-bridge/logo.webp",
    },
    {
        id: "guzel",
        name: "guzel",
        src: "/guzel/logo.webp",
    },
];

const CustomerImagesSection = () => {
    // Duplicate the array multiple times to create seamless infinite scroll
    const duplicatedImages = [
        ...ourClients,
        ...ourClients,
        ...ourClients,
        ...ourClients,
    ];

    return (
        <Box sx={{ py: { xs: 6, md: 10 } }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        fontWeight="bold"
                        sx={{
                            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
                        }}
                    >
                        Trusted by Businesses Worldwide
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                            fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' }
                        }}
                    >
                        See how our customers are using QR codes to transform their business
                    </Typography>
                </Box>
            </Container>

            <ScrollContainer>
                <ScrollTrack>
                    {duplicatedImages.map((image, index) => (
                        <ImageCard key={`${image.id}-${index}`}>
                            <Link href={`/${image.id}`}>
                                <Image
                                    src={image.src}
                                    alt={image.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 600px) 200px, (max-width: 960px) 250px, 300px"
                                />
                            </Link>
                        </ImageCard>
                    ))}
                </ScrollTrack>
            </ScrollContainer>
        </Box>
    );
};

export default CustomerImagesSection;