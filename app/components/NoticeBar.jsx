import { Notices } from '@/lib/helper'
import React from 'react'





const NoticeBar = () => {
    return (
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="bg-blue-600 text-white px-5 py-3 rounded-t-lg">
                <h2 className="text-xl font-bold">নোটিশ বোর্ড</h2>
            </div>

            <div className="p-6">
                <ul className="space-y-4">
                    {Notices.map((notice, index) => (
                        <li
                            key={index}
                            className="border-b pb-3 hover:text-blue-600 cursor-pointer"
                        >
                            ➤ {notice.title}
                        </li>
                    ))}
                </ul>

                <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    সকল নোটিশ
                </button>
            </div>
        </div>
    )
}

export default NoticeBar