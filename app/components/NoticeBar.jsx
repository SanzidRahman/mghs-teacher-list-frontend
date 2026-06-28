'use client'
import { getPDFs } from '@/lib/helper'
import Link from 'next/link';
import { useEffect, useState } from 'react'

const NoticeBar = () => {
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
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="bg-blue-600 text-white px-5 py-3 rounded-t-lg">
                <h2 className="text-xl font-bold">নোটিশ বোর্ড</h2>
            </div>

            <div className="p-6">
                {/* Content */}
                {loading ? (
                    <div className="space-y-3 animate-pulse">
                        <div className="h-12 bg-gray-200 rounded-md"></div>
                        <div className="h-12 bg-gray-200 rounded-md"></div>
                        <div className="h-12 bg-gray-200 rounded-md"></div>
                    </div>
                ) : pdfs.length > 0 ? (
                    <div className="space-y-3">
                        <ul className="space-y-4">
                            {pdfs.map((notice, index) => (
                                <div key={index}>
                                    <li
                                        key={index}
                                        className="text-sm border-b pb-3 hover:text-blue-600 cursor-pointer"
                                    >
                                        ➤ {notice.title}
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(notice.createdAt).toLocaleDateString()}
                                        </p>
                                    </li>

                                </div>
                            ))}


                        </ul>

                        <Link href={`/notice`} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            সকল নোটিশ
                        </Link>


                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        📭 কোনো PDF পাওয়া যায়নি
                    </div>
                )}
            </div>
        </div>
    )
}

export default NoticeBar