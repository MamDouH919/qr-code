"use client";

import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";


export default function GalleryCarousel({
    images,
    height = 400
}:{
    images: {
        full: string;
        thumb: string;
    }[]
    height?: number;
}) {
    useEffect(() => {
        Fancybox.bind("[data-fancybox='gallery']", {} as any);
        return () => Fancybox.destroy();
    }, []);

    return (
        <div style={{ width: "calc(100vw - 50px)", overflow: "hidden" }}>
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={16}
                slidesPerView={1} // show exactly 1 slide at a time
                style={{ width: "100%" }}
            >
                {images.map((img, i) => (
                    <SwiperSlide key={i}>
                        <a data-fancybox="gallery" href={img.full}>
                            <img
                                src={img.thumb}
                                style={{
                                    width: "100%",
                                    height: height,
                                    objectFit: "contain",
                                    borderRadius: 8,
                                }}
                            />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
