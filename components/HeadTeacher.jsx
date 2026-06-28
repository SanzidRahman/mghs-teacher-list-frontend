import Image from 'next/image'
import React from 'react'
import slider2 from "@/public/slider2.jpeg"

const HeadTeacher = () => {
    return (
        <div className="bg-white rounded-lg shadow">
            <div className="bg-sky-500 text-white px-5 py-3 rounded-t-lg">
                <h2 className="font-bold">প্রধান শিক্ষক</h2>
            </div>

            <div className="p-5 text-center">
                <Image
                    src={slider2}
                    alt="Head Teacher"
                    width={250}
                    height={300}
                    className=" rounded-lg object-cover"
                />

                <h3 className="mt-4 text-xl font-bold">তুলসী রানী সরকার</h3>
                <p className="text-gray-600 mt-2">প্রধান শিক্ষক</p>

                <button className="mt-4 w-full bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600">
                    বিস্তারিত দেখুন
                </button>
            </div>
        </div>
    )
}

export default HeadTeacher