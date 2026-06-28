"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_Url } from "@/lib/api";

const UpdatePdf = ({ params }) => {
    const { id } = React.use(params);

    const [formData, setFormData] = useState({
        title: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Fetch PDF
    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/pdfFile/${id}`);

                setFormData({
                    title: res.data?.title || "",
                });

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPdf();
        }
    }, [id]);



    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Validation
    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "PDF title is required";
        }

        return newErrors;
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        try {
            setSubmitting(true);

            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/pdfFile/${id}`, {
                title: formData.title,
            });

            alert("PDF title updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Update failed!");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border p-6 md:p-8">
                <h1 className="text-3xl font-bold text-center">
                    Update PDF
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Update PDF title information
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-gray-700">
                            PDF Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter PDF title"
                            className="w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.title && (
                            <p className="text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-medium transition"
                        >
                            {submitting
                                ? "Updating..."
                                : "Update PDF Title"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePdf;