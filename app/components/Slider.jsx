"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slider1 from "@/public/slider1.jpeg";
import slider2 from "@/public/slider2.jpeg";
import slider3 from "@/public/slider3.jpeg";
import slider4 from "@/public/slider4.jpeg";
import slider5 from "@/public/slider5.jpeg";

const SliderImage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  const sliders = [slider1, slider2, slider3, slider4, slider5];

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {sliders.map((slide, index) => (
          <div key={index}>
            <div className="relative w-full h-[220px] sm:h-[320px] md:h-[450px] lg:h-[420px]">
              <Image
                src={slide}
                alt={`slider-${index + 1}`}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderImage;
