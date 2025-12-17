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

const ScrollTrack = styled(Box)({
    display: 'flex',
    gap: '24px',
    animation: 'scroll 40s linear infinite',
    '&:hover': {
        animationPlayState: 'paused',
    },
    '@keyframes scroll': {
        '0%': {
            transform: 'translateX(0)',
        },
        '100%': {
            transform: 'translateX(-50%)',
        },
    },
});

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
}));

// Sample customer images data
export const ourClients = [
    {
        id: "dr-coffee",
        name: "Dr Coffee",
        src: "/dr-coffee/logo.webp",
    },
    {
        id: "arab-clinic",
        name: "Arab Clinic",
        src: "/arab-clinic/logo.webp",
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
    }
];

const CustomerImagesSection = () => {
    // Duplicate the array to create seamless infinite scroll
    const duplicatedImages = [
        ...ourClients,
        ...ourClients,
    ];

    return (
        <Box sx={{ py: 10, }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h3" gutterBottom fontWeight="bold">
                        Trusted by Businesses Worldwide
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
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
                                    sizes="300px"
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