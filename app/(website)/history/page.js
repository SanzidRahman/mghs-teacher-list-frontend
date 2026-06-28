import { HistoryOfMGHS } from '@/lib/helper'
import React from 'react'

const History = () => {
    return (
        <section className="mx-auto max-w-5xl px-4 py-4">
            <h2 className=" text-center text-3xl font-bold text-blue-600">
                মৌলভীবাজার সরকারি উচ্চ বিদ্যালয়ের ইতিহাস
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {HistoryOfMGHS.map((history, index) => (
                    <div
                        key={index}
                        className="rounded-lg border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-lg"
                    >
                        <p className="text-sm font-semibold text-slate-800">
                            {history.title}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default History
