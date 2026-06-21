"use client";

import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ADMIN_TEACHER_SHOW } from "@/lib/AdminPanelRoute";
import Image from "next/image";

const CreateTeacher = () => {
    const [preview, setPreview] = useState("");

    const breadcrumbItems = [
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "All-Teachers", href: ADMIN_TEACHER_SHOW },
    ];

    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        designation: "",
        joiningDate: "",
        birthDate: "",
        image: null,
    });

    // Handle Media
    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file, // ✅ fixed: use "image" consistently
            }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("subject", formData.subject);
            data.append("designation", formData.designation);
            data.append("joiningDate", dayjs(formData.joiningDate).format("YYYY-MM-DD"));
            data.append("birthDate", dayjs(formData.birthDate).format("YYYY-MM-DD"));
            if (formData.image) {
                data.append("image", formData.image);
            }

            const res = await axios.post("http://localhost:5000/api/teacher", data);
            console.log(res.data);

            // reset form
            setFormData({
                name: "",
                subject: "",
                designation: "",
                joiningDate: "",
                birthDate: "",
                image: null,
            });
            setPreview("");
            e.target.reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex py-2  bg-gray-50 px-3 md:px-6">
                <div className="w-full max-w-4xl rounded-2xl border shadow-xl bg-white p-8">
                    {/* HEADER */}
                    <div className="text-center space-y-2 pb-8">
                        <h1 className="text-2xl md:text-4xl font-bold">Teacher Application</h1>
                        <p className="text-sm md:text-base text-gray-500">
                            Fill your information correctly
                        </p>
                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-3 gap-5"
                    >
                        {/* NAME */}
                        <div>
                            <label className="block mb-2 font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Your Name"
                                className="w-full h-11 rounded-xl border px-3"
                            />
                        </div>

                        {/* SUBJECT */}
                        <div>
                            <label className="block mb-2 font-medium">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Enter Subject"
                                className="w-full h-11 rounded-xl border px-3"
                            />
                        </div>

                        {/* DESIGNATION */}
                        <div>
                            <label className="block mb-2 font-medium">Designation</label>
                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Enter Designation"
                                className="w-full h-11 rounded-xl border px-3"
                            />
                        </div>

                        {/* BIRTH DATE */}
                        <div>
                            <label className="block mb-2 font-medium">Birth Date</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                className="w-full h-11 rounded-xl border px-3"
                            />
                        </div>

                        {/* JOINING DATE */}
                        <div>
                            <label className="block mb-2 font-medium">Joining Date</label>
                            <input
                                type="date"
                                name="joiningDate"
                                value={formData.joiningDate}
                                onChange={handleChange}
                                className="w-full h-11 rounded-xl border px-3"
                            />
                        </div>

                        {/* IMAGE */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleMediaChange}
                                className="w-full rounded border px-3 py-2 cursor-pointer"
                            />
                            {preview && (
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    height={200}
                                    width={200}
                                    className="mt-3 h-40 w-32 rounded border object-cover"
                                />
                            )}
                        </div>

                        {/* BUTTON */}
                        <div className="md:col-span-3 pt-2">
                            <button
                                type="submit"
                                className="w-full h-12 rounded-xl bg-blue-600 text-white text-base font-medium hover:bg-blue-700"
                            >
                                Submit Application
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTeacher;
