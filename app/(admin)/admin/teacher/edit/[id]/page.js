"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Api_Url } from "@/lib/api";

const UpdateTeacher = ({ params }) => {
    const { id } = React.use(params);

    // ✅ Local state for form fields
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        designation: "",
        joiningDate: "",
        birthDate: "",
        image: null,
    });

    const [errors, setErrors] = useState({});

    // FETCH SINGLE TEACHER
    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const res = await axios.get(`${Api_Url}/api/teacher/${id}`);
                const teacher = res.data;

                setFormData({
                    name: teacher.name || "",
                    subject: teacher.subject || "",
                    designation: teacher.designation || "",
                    joiningDate: teacher.joiningDate
                        ? dayjs(teacher.joiningDate).format("YYYY-MM-DD")
                        : "",
                    birthDate: teacher.birthDate
                        ? dayjs(teacher.birthDate).format("YYYY-MM-DD")
                        : "",
                    image: null,
                });
            } catch (error) {
                console.error(error.message);
            }
        };

        if (id) {
            fetchTeacher();
        }
    }, [id]);

    // HANDLE CHANGE
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files : value,
        }));
    };

    // VALIDATION
    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.subject) newErrors.subject = "Subject is required";
        if (!formData.designation) newErrors.designation = "Designation is required";
        if (!formData.birthDate) newErrors.birthDate = "Birth date is required";
        if (!formData.joiningDate) newErrors.joiningDate = "Joining date is required";
        return newErrors;
    };

    // SUBMIT
    const handleTeacherSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("subject", formData.subject);
            data.append("designation", formData.designation);
            data.append("joiningDate", formData.joiningDate);
            data.append("birthDate", formData.birthDate);

            if (formData.image?.[0]) {
                data.append("image", formData.image[0]);
            }

            await axios.put(`${Api_Url}/api/teacher/${id}`, data);
            alert("Teacher updated successfully!");
        } catch (error) {
            console.error(error.message);
            alert("Update failed!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border p-6 md:p-8">
                <h1 className="text-3xl font-bold text-center">Update Teacher</h1>
                <p className="text-center text-gray-500 mt-2 mb-8">
                    Update teacher information
                </p>

                {/* Form */}
                <form onSubmit={handleTeacherSubmit} className="space-y-6">
                    {/* NAME */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <label className="md:w-40 font-medium text-gray-700">Name</label>
                        <div className="flex-1">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Teacher Name"
                                className="w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>
                    </div>

                    {/* SUBJECT */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <label className="md:w-40 font-medium text-gray-700">Subject</label>
                        <div className="flex-1">
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Enter Subject"
                                className="w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.subject && (
                                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                            )}
                        </div>
                    </div>

                    {/* DESIGNATION */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <label className="md:w-40 font-medium text-gray-700">
                            Designation
                        </label>
                        <div className="flex-1">
                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Enter Designation"
                                className="w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.designation && (
                                <p className="mt-1 text-sm text-red-500">{errors.designation}</p>
                            )}
                        </div>
                    </div>

                    {/* BIRTH DATE */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <label className="md:w-40 font-medium text-gray-700">
                            Birth Date
                        </label>
                        <div className="flex-1">
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                className="w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.birthDate && (
                                <p className="mt-1 text-sm text-red-500">{errors.birthDate}</p>
                            )}
                        </div>
                    </div>

                    {/* JOINING DATE */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <label className="md:w-40 font-medium text-gray-700">
                            Joining Date
                        </label>
                        <div className="flex-1">
                            <input
                                type="date"
                                name="joiningDate"
                                value={formData.joiningDate}
                                onChange={handleChange}
                                className="w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.joiningDate && (
                                <p className="mt-1 text-sm text-red-500">{errors.joiningDate}</p>
                            )}
                        </div>
                    </div>

                    {/* IMAGE */}
                    <div className="flex flex-col md:flex-row gap-3">
                        <label className="md:w-40 font-medium text-gray-700 pt-2">
                            Image
                        </label>
                        <div className="flex-1">
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg cursor-pointer"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Upload teacher profile picture
                            </p>
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                            )}
                        </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer"
                        >
                            Update Teacher
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTeacher;
