import React from 'react';
import { Box, Container, Typography, styled } from '@mui/material';
import Image from 'next/image';

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
const customerImages = [
    { id: 1, src: "/arab-clinic/logo.webp", alt: 'Arab Clinic' },
    { id: 2, src: "/arab-clinic/logo.webp", alt: 'Retail customer' },
    { id: 3, src: "/arab-clinic/logo.webp", alt: 'Healthcare customer' },
    { id: 4, src: "/arab-clinic/logo.webp", alt: 'Real estate customer' },
    { id: 5, src: "/arab-clinic/logo.webp", alt: 'Restaurant customer' },
    { id: 6, src: "/arab-clinic/logo.webp", alt: 'Retail customer' },
];

const CustomerImagesSection = () => {
    // Duplicate the array to create seamless infinite scroll
    const duplicatedImages = [...customerImages, ...customerImages];

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
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="300px"
                            />
                        </ImageCard>
                    ))}
                </ScrollTrack>
            </ScrollContainer>
        </Box>
    );
};

export default CustomerImagesSection;