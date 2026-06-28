import Image from 'next/image'
import React from 'react'
import mghs from "@/public/slider4.jpeg";
import mghs_logo from "@/public/mghs_logo.png";

const Hero = () => {
    return (
        <div><section className="relative h-[220px] md:h-[260px] overflow-hidden">
            <Image
                src={mghs}
                alt="School Banner"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="relative z-20 h-full flex items-center px-12">
                <div className="flex flex-col  gap-6">
                    <Image
                        src={mghs_logo}
                        alt="School Logo"
                        width={100}
                        height={100}
                        className="bg-white rounded-full p-1"
                    />

                    <div>
                        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                            মৌলভীবাজার সরকারি উচ্চ বিদ্যালয়
                        </h1>

                        <p className="text-xl text-white font-semibold drop-shadow">
                            মৌলভীবাজার সদর, মৌলভীবাজার
                        </p>
                    </div>
                </div>
            </div>
        </section></div>
    )
}

export default Hero