import Link from "next/link";
import React from "react";
import SliderImage from "../components/Slider";
import NoticeBoard from "@/components/NoticeBoard";

const noticeBoard = [
    { title: "🔥 বাংলাদেশে নতুন শিক্ষা নীতি ঘোষণা", href: "/notice" },
    { title: "🌧️ আগামীকাল ভারী বৃষ্টির সম্ভাবনা", href: "/notice" },
    { title: "⚽ আজ রাত ১০টায় বাংলাদেশ বনাম ভারত ম্যাচ", href: "/notice" },
    { title: "📢 সর্বশেষ আপডেট পেতে আমাদের সাথেই থাকুন", href: "/notice" }
]


const Home = () => {
    return (
        <div>

            {/* Navbar section */}
            <section>
                <div className="flex items-center bg-blue-600 text-white  overflow-hidden shadow-lg">
                    <div className="bg-violet-600/40 border-0 px-4 py-3 font-bold text-sm shrink-0">
                        Notice:
                    </div>

                    <div className="overflow-hidden w-full">
                        <div className="animate-marquee py-3 flex gap-10 cursor-pointer">
                            {noticeBoard && noticeBoard.map((notice, index) => (
                                <Link
                                    key={index}
                                    href={notice.href}
                                    className="hover:text-yellow-400 transition whitespace-nowrap"
                                >
                                    {notice.title}
                                </Link>
                            ))}

                        </div>
                    </div>
                </div>

                <h1 className="text-4xl text-center font-bold py-4">
                    Moulvibazar Govt. High School
                </h1>
            </section>

            {/* Slider section */}
            <section>
                <SliderImage />
            </section>

            <section>
                <NoticeBoard />
            </section>
        </div>
    );
};

export default Home;