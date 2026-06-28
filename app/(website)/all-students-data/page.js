"use client";

import { useState } from "react";
import { Search, Users, ChevronDown } from "lucide-react";

export default function StudentFilter() {
    const [year, setYear] = useState("2026");
    const [className, setClassName] = useState("");
    const [shift, setShift] = useState("");
    const [section, setSection] = useState("");

    const filterOptions = [
        { id: "class", label: "Class", value: className, setValue: setClassName, options: ["6", "7", "8", "9", "10"] },
        { id: "shift", label: "Shift", value: shift, setValue: setShift, options: ["Morning", "Day"] },
        { id: "section", label: "Section", value: section, setValue: setSection, options: ["A", "B", "C"] },
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header with gradient */}
                    <div className="bg-linear-to-r from-blue-600 to-purple-600 px-6 py-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <Users className="w-6 h-6" />
                                অধ্যয়নরত শিক্ষার্থীর তালিকা
                            </h2>
                            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                                <span className="text-white font-medium">Year: {year}</span>
                            </div>
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {filterOptions.map((filter) => (
                                <div key={filter.id} className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        {filter.label}
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={filter.value}
                                            onChange={(e) => filter.setValue(e.target.value)}
                                            className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white"
                                        >
                                            <option value="">Select {filter.label}</option>
                                            {filter.options.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {filter.label === "Class" ? `Class ${opt}` :
                                                        filter.label === "Section" ? `Section ${opt}` : opt}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />

                    {/* Footer with Total */}
                    <div className="px-6 py-5 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-gray-600 font-medium">Total Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                0
                            </span>
                            <span className="text-gray-500">students</span>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}