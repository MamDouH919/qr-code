"use client";

import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function GalleryCarousel({
    images,
    height = 400,
    variant = "default",
    title
}: {
    images: {
        full: string;
        thumb: string;
    }[]
    height?: number;
    variant?: "default" | "circle";
    title?: string;
}) {
    useEffect(() => {
        Fancybox.bind("[data-fancybox='gallery']", {} as any);
        return () => Fancybox.destroy();
    }, []);

    const theme = useTheme();

    const isCircle = variant === "circle";
    const imageSize = isCircle ? Math.min(height, 400) : height;

    return (
        <Box>
            <Container>
                {title && <Stack direction="row" justifyContent="center" alignItems="center" mb={2}>
                    <Typography variant="h2" alignItems={"center"} fontSize={35}>
                        {title}
                    </Typography>
                </Stack>}
                <div style={{ width: "100%", overflow: "visible", position: "relative" }}>
                    <Swiper
                        dir={"ltr"}
                        modules={[Pagination, Autoplay]}
                        pagination={{
                            clickable: true,
                            dynamicBullets: false,
                        }}
                        loop={true}
                        spaceBetween={16}
                        slidesPerView={1}
                        style={{ width: "100%" }}
                    >
                        {images.map((img, i) => (
                            <SwiperSlide key={i} style={{ margin: 0 }}>
                                <Stack
                                    mb={2}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    direction={"row"}
                                    width={"100%"}
                                    height={isCircle ? imageSize : "100%"}
                                >
                                    <a data-fancybox="gallery" href={img.full}>
                                        <img
                                            src={img.thumb}
                                            alt={`Gallery image ${i + 1}`}
                                            style={{
                                                width: isCircle ? imageSize : "100%",
                                                height: imageSize,
                                                objectFit: isCircle ? "cover" : "contain",
                                                borderRadius: isCircle ? "50%" : 8,
                                                aspectRatio: isCircle ? "1/1" : "auto",
                                            }}
                                        />
                                    </a>
                                </Stack>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <style jsx global>{`
                        .swiper-pagination {
                            position: relative !important;
                            margin-top: ${theme.spacing(2)} !important;
                            display: flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            gap: 8px !important;
                        }
                        .swiper-pagination-bullet {
                            background: ${theme.palette.secondary.light} !important;
                            opacity: 0.3 !important;
                            width: 8px !important;
                            height: 8px !important;
                            transition: all 0.3s ease !important;
                            margin: 0 !important;
                        }
                        .swiper-pagination-bullet-active {
                            background: ${theme.palette.secondary.main} !important;
                            opacity: 1 !important;
                            width: 12px !important;
                            height: 12px !important;
                        }
                    `}</style>
                </div>
            </Container>
        </Box>
    );
}