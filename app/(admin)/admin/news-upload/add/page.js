"use client";

import { useRef, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ADMIN_UPLOADFILE_SHOW } from "@/lib/AdminPanelRoute";

export default function UploadPdfPage() {
    const [title, setTitle] = useState("");
    const [pdf, setPdf] = useState(null);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);
    const breadcrumbItems = [
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "All-News", href: ADMIN_UPLOADFILE_SHOW },
    ];

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return alert("Please enter a PDF title");
        }

        if (!pdf) {
            return alert("Please select a PDF file");
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("title", title);
            formData.append("pdf", pdf);

            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/newsFile`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert(data.message || "News uploaded successfully");

            setTitle("");
            setPdf(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                "Failed to upload PDF"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <section className=" bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
                <div className=" w-full max-w-2xl">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        {/* Header */}
                        <div className="border-b border-slate-200 px-6 py-5">
                            <h1 className="text-2xl font-bold text-slate-900">
                                Upload News
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Upload and store PDF files securely.
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleUpload}
                            className="space-y-6 p-6"
                        >
                            {/* Title */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    News Title
                                </label>

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                    placeholder="Enter PDF title"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    News File
                                </label>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) =>
                                        setPdf(e.target.files?.[0] || null)
                                    }
                                    className="block w-full rounded-xl border border-slate-300 p-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-600 hover:file:bg-blue-100"
                                />

                                {pdf && (
                                    <div className="mt-3 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                                        Selected:{" "}
                                        <span className="font-medium">
                                            {pdf.name}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <svg
                                            className="mr-2 h-5 w-5 animate-spin"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                className="opacity-25"
                                            />
                                            <path
                                                fill="currentColor"
                                                className="opacity-75"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            />
                                        </svg>
                                        Uploading...
                                    </>
                                ) : (
                                    "Upload PDF"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>

    );
}