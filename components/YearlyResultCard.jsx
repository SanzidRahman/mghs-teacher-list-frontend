"use client";

export default function ResultTable({ results }) {
    return (
        <div className="overflow-x-auto border border-gray-400">
            <h2 className="text-center font-bold text-2xl py-4">
                বার্ষিক পরীক্ষার ফলাফল
            </h2>

            <table className="min-w-full border-collapse text-center">
                <thead>
                    <tr className="bg-gray-100">
                        <th rowSpan={2} className="border p-2">
                            পরীক্ষার নাম
                        </th>

                        <th rowSpan={2} className="border p-2">
                            সাল
                        </th>

                        <th colSpan={3} className="border p-2">
                            মোট পরীক্ষার্থী
                        </th>

                        <th colSpan={3} className="border p-2">
                            পাশকৃত শিক্ষার্থী
                        </th>

                        <th colSpan={3} className="border p-2">
                            জিপিএ ৫.০০
                        </th>

                        <th rowSpan={2} className="border p-2">
                            পাশের হার
                        </th>

                        <th colSpan={3} className="border p-2">
                            বৃত্তিপ্রাপ্ত শিক্ষার্থী
                        </th>
                    </tr>

                    <tr className="bg-gray-100">
                        <th className="border p-2">ছেলে</th>
                        <th className="border p-2">মেয়ে</th>
                        <th className="border p-2">মোট</th>

                        <th className="border p-2">ছেলে</th>
                        <th className="border p-2">মেয়ে</th>
                        <th className="border p-2">মোট</th>

                        <th className="border p-2">ছেলে</th>
                        <th className="border p-2">মেয়ে</th>
                        <th className="border p-2">মোট</th>

                        <th className="border p-2">ছেলে</th>
                        <th className="border p-2">মেয়ে</th>
                        <th className="border p-2">মোট</th>
                    </tr>
                </thead>

                <tbody>
                    {results.map((item) => {
                        const totalExaminee =
                            item.boysExaminee + item.girlsExaminee;

                        const totalPass =
                            item.boysPass + item.girlsPass;

                        const totalGPA5 =
                            item.boysGPA5 + item.girlsGPA5;

                        const totalScholarship =
                            item.boysScholarship + item.girlsScholarship;

                        const passRate =
                            totalExaminee > 0
                                ? ((totalPass / totalExaminee) * 100).toFixed(0)
                                : 0;

                        return (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="border p-2 font-medium">
                                    {item.examName}
                                </td>

                                <td className="border p-2">
                                    {item.session}
                                </td>

                                <td className="border p-2">
                                    {item.boysExaminee}
                                </td>

                                <td className="border p-2">
                                    {item.girlsExaminee}
                                </td>

                                <td className="border p-2 font-semibold">
                                    {totalExaminee}
                                </td>

                                <td className="border p-2">
                                    {item.boysPass}
                                </td>

                                <td className="border p-2">
                                    {item.girlsPass}
                                </td>

                                <td className="border p-2 font-semibold">
                                    {totalPass}
                                </td>

                                <td className="border p-2">
                                    {item.boysGPA5}
                                </td>

                                <td className="border p-2">
                                    {item.girlsGPA5}
                                </td>

                                <td className="border p-2 font-semibold">
                                    {totalGPA5}
                                </td>

                                <td className="border p-2 font-bold">
                                    {passRate}%
                                </td>

                                <td className="border p-2">
                                    {item.boysScholarship}
                                </td>

                                <td className="border p-2">
                                    {item.girlsScholarship}
                                </td>

                                <td className="border p-2 font-semibold">
                                    {totalScholarship}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}