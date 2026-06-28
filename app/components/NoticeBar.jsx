'use client';

import { getPDFs } from '@/lib/helper';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NoticeBar = () => {
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getPDFs();
                const data = res?.data?.pdfData || [];

                // Show only the first 5 notices
                const latestNotices = data.slice(0, 5);
                setPdfs(latestNotices);
            } catch (error) {
                console.error('Failed to load notices:', error);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return (
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
            {/* Header */}
            <div className="bg-blue-600 text-white px-5 py-3 rounded-t-lg">
                <h2 className="text-xl font-bold">নোটিশ বোর্ড</h2>
            </div>

            {/* Content */}
            <div className="p-6">
                {loading ? (
                    <div className="space-y-3 animate-pulse">
                        <div className="h-12 bg-gray-200 rounded-md"></div>
                        <div className="h-12 bg-gray-200 rounded-md"></div>
                        <div className="h-12 bg-gray-200 rounded-md"></div>
                        <div className="h-12 bg-gray-200 rounded-md"></div>
                        <div className="h-12 bg-gray-200 rounded-md"></div>
                    </div>
                ) : pdfs.length > 0 ? (
                    <>
                        <ul className="space-y-4">
                            {pdfs.map((notice) => (
                                <li key={notice._id} className="border-b pb-3">
                                    <Link
                                        href={`/notice/${notice.slug}`}
                                        className="block hover:text-blue-600 transition-colors"
                                    >
                                        <h3 className="text-sm font-medium">
                                            ➤ {notice.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(
                                                notice.createdAt
                                            ).toLocaleDateString('en-GB')}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 text-start">
                            <Link
                                href="/notice/all"
                                className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                সকল নোটিশ
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        📭 কোনো নোটিশ পাওয়া যায়নি
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoticeBar;