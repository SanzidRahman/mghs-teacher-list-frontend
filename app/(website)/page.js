import Link from "next/link";
import React from "react";
import SliderImage from "../components/Slider";


const Home = () => {
  return (
    <div>
      <div className="flex items-center bg-blue-600 text-white  overflow-hidden shadow-lg">
        <div className="bg-red-600 px-4 py-3 font-bold text-sm shrink-0">
          Notice:
        </div>

        <div className="overflow-hidden w-full">
          <div className="animate-marquee py-3 flex gap-10 cursor-pointer">
            <Link
              href="/news/1"
              className="hover:text-yellow-400 transition whitespace-nowrap"
            >
              🔥 বাংলাদেশে নতুন শিক্ষা নীতি ঘোষণা
            </Link>

            <Link
              href="/news/2"
              className="hover:text-yellow-400 transition whitespace-nowrap"
            >
              🌧️ আগামীকাল ভারী বৃষ্টির সম্ভাবনা
            </Link>

            <Link
              href="/news/3"
              className="hover:text-yellow-400 transition whitespace-nowrap"
            >
              ⚽ আজ রাত ১০টায় বাংলাদেশ বনাম ভারত ম্যাচ
            </Link>

            <Link
              href="/news/4"
              className="hover:text-yellow-400 transition whitespace-nowrap"
            >
              📢 সর্বশেষ আপডেট পেতে আমাদের সাথেই থাকুন
            </Link>
          </div>
        </div>
      </div>

      <h1 className="text-4xl text-center font-bold py-4">
        Moulvibazar Govt. High School
      </h1>

      <section>
        <SliderImage />
      </section>
    </div>
  );
};

export default Home;
