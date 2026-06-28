'use client'
import { getNews } from '@/lib/helper' // Removed NewsBoard since it wasn't being used
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



const News = () => {
    // Initialized as null but typed or left flexible for data objects
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getNews();
                const data = res?.data?.newsData || [];

                // Show only the first 5 notices
                const latestNotices = data.slice(0, 5);

                setNews(latestNotices);

                if (latestNotices.length > 0) {
                    setSelectedPdf(latestNotices[0]);
                }
            } catch (error) {
                console.error('Failed to load notices:', error);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    console.log(news)

    if (loading) {
        return <div className="text-center p-4">Loading news...</div>; // Simple loading state handling
    }

    return (
        <section>
            <div className="flex items-center mt-4 bg-blue-600 text-white overflow-hidden shadow-lg">
                <div className="bg-violet-600/40 border-0 px-4 py-3 font-bold text-sm shrink-0">
                    News:
                </div>

                <div className="overflow-hidden w-full">
                    <div className="animate-marquee py-3 flex gap-10 cursor-pointer">
                        {news.length > 0 ? (
                            news.map((notice) => (
                                <Link
                                    key={notice._id}
                                    href={`/news/${notice.slug}`}   // or `/news/${notice._id}`
                                    className="hover:text-yellow-400 transition whitespace-nowrap"
                                >
                                    {notice.title}
                                </Link>
                            ))
                        ) : (
                            <span className="px-4">No recent news available.</span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default News;