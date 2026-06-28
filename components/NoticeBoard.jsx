"use client";

import { getPDFs } from "@/lib/helper";
import { useEffect, useState } from "react";

export default function NoticeBoard() {
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const INITIAL_COUNT = 5;
    const displayedPdfs = showAll ? pdfs : pdfs.slice(0, INITIAL_COUNT);
    const hasMore = pdfs.length > INITIAL_COUNT;

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getPDFs();
                const data = res?.data?.pdfData || [];

                setPdfs(data);

                if (data.length > 0) {
                    setSelectedPdf(data[0]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
            <div className="w-full mx-auto bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="bg-blue-600 px-6 py-5">
                    <h1 className="text-xl sm:text-2xl font-bold text-white">
                        📢 নোটিশ বোর্ড
                    </h1>
                    <p className="text-blue-100 text-sm mt-1">
                        সকল গুরুত্বপূর্ণ নোটিশ ও PDF ফাইল
                    </p>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-6">

                    {/* Title */}
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        📑 সংযুক্ত PDF তালিকা
                    </h2>

                    {/* Content */}

                    {loading ? (
                        <div className="space-y-3 animate-pulse">
                            <div className="h-12 bg-gray-200 rounded-md"></div>
                            <div className="h-12 bg-gray-200 rounded-md"></div>
                            <div className="h-12 bg-gray-200 rounded-md"></div>
                        </div>
                    ) : pdfs.length > 0 ? (
                        <>
                            <div className="space-y-3">
                                {displayedPdfs.map((pdf) => (
                                    <div
                                        key={pdf._id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 hover:bg-gray-100 transition p-4 rounded-xl border hover:shadow-md"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-gray-900 font-medium text-sm sm:text-base truncate">
                                                {pdf.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(pdf.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>

                                        <div className="flex gap-2 flex-wrap flex-shrink-0">
                                            <a
                                                href={pdf.pdf_secure_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center px-3.5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                aria-label={`View ${pdf.title}`}
                                            >
                                                👁️ View
                                            </a>

                                            <a
                                                href={pdf.pdf_secure_url}
                                                download
                                                className="inline-flex items-center justify-center px-3.5 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                                aria-label={`Download ${pdf.title}`}
                                            >
                                                📥 Download
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* See All Button */}
                            {hasMore && (
                                <div className="text-center mt-6">
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        {showAll ? (
                                            <>
                                                <span>📤</span> Show Less
                                            </>
                                        ) : (
                                            <>
                                                <span>📋</span> See All ({pdfs.length} notices)
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            📭 কোনো PDF পাওয়া যায়নি
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}



