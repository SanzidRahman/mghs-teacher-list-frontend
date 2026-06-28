"use client";

import Input from "@/app/components/Input";
import SelectInput from "@/components/SelectInput";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialState = {
    _id: "",
    session: "",
    examName: "",
    boysExaminee: "",
    girlsExaminee: "",
    boysPass: "",
    girlsPass: "",
    boysGPA5: "",
    girlsGPA5: "",
    boysScholarship: "",
    girlsScholarship: "",
};

const exams = [
    "PSC",
    "JSC",
    "SSC",
    "HSC",
    "Half Yearly",
    "Annual",
    "Pre-Test",
    "Test",
];

export default function YearlyResultPage() {
    const [formData, setFormData] = useState(initialState);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadResults();
    }, []);

    const loadResults = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/yearly-results");
            setResults(res?.data?.data);
        } catch (err) {
            console.log(err);
        }
    };



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (formData._id) {
                await axios.put(
                    `http://localhost:5000/api/yearly-results/${formData._id}`,
                    formData
                );

                toast.success("Updated Successfully");
            } else {
                await axios.post(
                    "http://localhost:5000/api/yearly-results",
                    formData
                );

                toast.success("Saved Successfully");
            }

            setFormData(initialState);
            loadResults();
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setFormData(item);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this record?")) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/yearly-results/${id}`
            );

            toast.success("Deleted");
            loadResults();
        } catch (err) {
            toast.error("Delete Failed");
        }
    };

    const handleReset = () => {
        setFormData(initialState);
    };



    return (
        <div className="max-w-7xl mx-auto p-6">

            <div className="bg-white rounded-lg shadow border">

                <div className="border-b p-4 text-center text-2xl font-bold">
                    বার্ষিক পরীক্ষার ফলাফল
                </div>

                <div className="grid md:grid-cols-2 gap-4 p-6">

                    {/* Left */}

                    <div className="space-y-2">

                        <div className="grid grid-cols-2 items-center gap-4">
                            <Input
                                label="পরীক্ষার সাল :"
                                name="session"
                                type="number"
                                value={formData.session}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-4">
                            <Input
                                label="পরীক্ষার্থী (ছেলে):"
                                name="boysExaminee"
                                type="number"
                                value={formData.boysExaminee}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-4">
                            <Input
                                label="পাস (ছেলে) :"
                                name="boysPass"
                                type="number"
                                value={formData.boysPass}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-4">
                            <Input
                                label="জিপিএ ৫.০০ (ছেলে) :"
                                name="boysGPA5"
                                type="number"
                                value={formData.boysGPA5}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-4">
                            <Input
                                label="বৃত্তিপ্রাপ্ত (ছেলে) :"
                                name="boysScholarship"
                                type="number"
                                value={formData.boysScholarship}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    {/* Right */}

                    <div className="space-y-2">

                        <div className="grid grid-cols-2 items-center gap-4">

                            <SelectInput
                                label="পরীক্ষার নাম :"
                                name="examName"
                                value={formData.examName}
                                onChange={handleChange}
                                options={[
                                    "PSC",
                                    "JSC",
                                    "SSC",
                                    "HSC",
                                    "Half Yearly",
                                    "Annual",
                                ]}
                            />

                        </div>

                        <div className="grid grid-cols-2 items-center gap-4">
                            <Input
                                label="পরীক্ষার্থী (মেয়ে):"
                                name="girlsExaminee"
                                type="number"
                                value={formData.girlsExaminee}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-4">
                            <Input
                                label="পাস (মেয়ে) :"
                                name="girlsPass"
                                type="number"
                                value={formData.girlsPass}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-4">
                            <Input
                                label="জিপিএ ৫.০০ (মেয়ে) :"
                                name="girlsGPA5"
                                type="number"
                                value={formData.girlsGPA5}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-4">
                            <Input
                                label="বৃত্তিপ্রাপ্ত (মেয়ে) :"
                                name="girlsScholarship"
                                type="number"
                                value={formData.girlsScholarship}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                </div>

                <div className="flex justify-center gap-4 pb-6">

                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>

                    <button
                        onClick={handleReset}
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded"
                    >
                        Reset
                    </button>

                </div>

            </div>

            {/* Table */}

            <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">

                <table className="w-full border-collapse">

                    <thead className="bg-blue-600 text-white">

                        <tr>

                            <th className="border p-2">#</th>
                            <th className="border p-2">সাল</th>
                            <th className="border p-2">পরীক্ষা</th>
                            <th className="border p-2">ছেলে</th>
                            <th className="border p-2">মেয়ে</th>
                            <th className="border p-2">পাস (ছেলে)</th>
                            <th className="border p-2">পাস (মেয়ে)</th>
                            <th className="border p-2">GPA 5 (ছেলে)</th>
                            <th className="border p-2">GPA 5 (মেয়ে)</th>
                            <th className="border p-2">বৃত্তি (ছেলে)</th>
                            <th className="border p-2">বৃত্তি (মেয়ে)</th>
                            <th className="border p-2">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {results.length === 0 && (
                            <tr>
                                <td
                                    colSpan={12}
                                    className="text-center py-8"
                                >
                                    No Data Found
                                </td>
                            </tr>
                        )}

                        {results.map((item, index) => (

                            <tr
                                key={item._id}
                                className="hover:bg-gray-100"
                            >
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{item.session}</td>
                                <td className="border p-2">{item.examName}</td>
                                <td className="border p-2">{item.boysExaminee}</td>
                                <td className="border p-2">{item.girlsExaminee}</td>
                                <td className="border p-2">{item.boysPass}</td>
                                <td className="border p-2">{item.girlsPass}</td>
                                <td className="border p-2">{item.boysGPA5}</td>
                                <td className="border p-2">{item.girlsGPA5}</td>
                                <td className="border p-2">{item.boysScholarship}</td>
                                <td className="border p-2">{item.girlsScholarship}</td>

                                <td className="border p-2">

                                    <div className="flex gap-2 justify-center">

                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="bg-green-600 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}