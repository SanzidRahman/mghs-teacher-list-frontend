"use client";

import { getPDFs } from "@/lib/helper";
import { useEffect, useState } from "react";

export default function NoticeBoard() {
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);


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
                        <div className="space-y-3">
                            {pdfs.map((pdf) => (
                                <div
                                    key={pdf._id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 hover:bg-gray-100 transition p-4 rounded-xl border"
                                >
                                    <div className="flex-1">
                                        <h3 className="text-gray-900 font-medium text-sm sm:text-base">
                                            {pdf.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(pdf.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex gap-2 flex-wrap">
                                        <a
                                            href={pdf.pdf_secure_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                        >
                                            👁️ View
                                        </a>


                                        <a
                                            href={pdf.pdf_secure_url}
                                            download
                                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                                        >
                                            📥 Download
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            📭 কোনো PDF পাওয়া যায়নি
                        </div>
                    )}

                    {/* Footer Button */}
                    <div className="mt-6 flex justify-center">
                        <button className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition text-sm sm:text-base">
                            সকল নোটিশ দেখুন
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}



