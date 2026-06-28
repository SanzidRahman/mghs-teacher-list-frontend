"use client";

export default function StudentStatisticsTable() {
    const data = [
        {
            class: "Six",
            shift: "Morning",
            boys: 47,
            girls: 46,
            total: 93,
            muslim: 91,
            hindu: 2,
            other: 0,
            disabled: 1,
            stipend: 0,
            orphan: 0,
            freedom: 0,
        },
        {
            class: "Six",
            shift: "Day",
            boys: 45,
            girls: 42,
            total: 87,
            muslim: 86,
            hindu: 1,
            other: 0,
            disabled: 0,
            stipend: 1,
            orphan: 0,
            freedom: 0,
        },
        {
            class: "Seven",
            shift: "Morning",
            boys: 50,
            girls: 48,
            total: 98,
            muslim: 95,
            hindu: 3,
            other: 0,
            disabled: 0,
            stipend: 1,
            orphan: 1,
            freedom: 0,
        },
        {
            class: "Eight",
            shift: "Morning",
            boys: 46,
            girls: 44,
            total: 90,
            muslim: 89,
            hindu: 1,
            other: 0,
            disabled: 1,
            stipend: 0,
            orphan: 0,
            freedom: 0,
        },
        {
            class: "Nine",
            shift: "Morning",
            boys: 44,
            girls: 42,
            total: 86,
            muslim: 84,
            hindu: 2,
            other: 0,
            disabled: 0,
            stipend: 1,
            orphan: 0,
            freedom: 0,
        },
        {
            class: "Ten",
            shift: "Morning",
            boys: 43,
            girls: 41,
            total: 84,
            muslim: 82,
            hindu: 2,
            other: 0,
            disabled: 0,
            stipend: 1,
            orphan: 0,
            freedom: 0,
        },
    ];

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-center text-lg font-bold mb-4">
                শিক্ষার্থীদের পরিসংখ্যান
            </h2>

            <div className="overflow-x-auto border">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">শ্রেণি</th>
                            <th className="border p-2">শিফট</th>
                            <th className="border p-2">ছাত্র</th>
                            <th className="border p-2">ছাত্রী</th>
                            <th className="border p-2">মোট</th>
                            <th className="border p-2">মুসলিম</th>
                            <th className="border p-2">হিন্দু</th>
                            <th className="border p-2">অন্যান্য</th>
                            <th className="border p-2">প্রতিবন্ধী</th>
                            <th className="border p-2">উপবৃত্তি</th>
                            <th className="border p-2">এতিম</th>
                            <th className="border p-2">মুক্তিযোদ্ধা</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="text-center">
                                <td className="border p-2">{item.class}</td>
                                <td className="border p-2">{item.shift}</td>
                                <td className="border p-2">{item.boys}</td>
                                <td className="border p-2">{item.girls}</td>
                                <td className="border p-2 font-semibold">{item.total}</td>
                                <td className="border p-2">{item.muslim}</td>
                                <td className="border p-2">{item.hindu}</td>
                                <td className="border p-2">{item.other}</td>
                                <td className="border p-2">{item.disabled}</td>
                                <td className="border p-2">{item.stipend}</td>
                                <td className="border p-2">{item.orphan}</td>
                                <td className="border p-2">{item.freedom}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary Table */}

            <div className="max-w-md mx-auto mt-8 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <tbody>
                        <tr>
                            <td className="border p-2 font-medium">
                                মোট শিক্ষার্থীর সংখ্যা
                            </td>
                            <td className="border p-2 text-center">538</td>
                        </tr>

                        <tr>
                            <td className="border p-2 font-medium">ছাত্র</td>
                            <td className="border p-2 text-center">275</td>
                        </tr>

                        <tr>
                            <td className="border p-2 font-medium">ছাত্রী</td>
                            <td className="border p-2 text-center">263</td>
                        </tr>

                        <tr>
                            <td className="border p-2 font-medium">প্রতিবন্ধী শিক্ষার্থী</td>
                            <td className="border p-2 text-center">3</td>
                        </tr>

                        <tr>
                            <td className="border p-2 font-medium">উপবৃত্তিপ্রাপ্ত</td>
                            <td className="border p-2 text-center">6</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}