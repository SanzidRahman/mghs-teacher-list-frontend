"use client";

import { useState } from "react";

export default function StudentForm() {
    const [formData, setFormData] = useState({
        session: "",
        shift: "",
        roll: "",
        class: "",
        section: "",
        studentName: "",
        fatherName: "",
        motherName: "",
        gender: "",
        religion: "",
        bloodGroup: "",
        guardianPhone: "",
        dob: "",
        birthRegistration: "",
        presentAddress: "",
        permanentAddress: "",
        freedomFighter: "",
        disability: "",
        scholarship: "",
        stipend: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="max-w-7xl mx-auto bg-white border border-blue-600 shadow-lg my-6">
            {/* Header */}
            <div className="bg-blue-600 text-white text-center font-bold py-3 text-lg uppercase">
                Student Information
            </div>

            <form onSubmit={handleSubmit} className="p-6">

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">

                    {/* Left Side */}

                    <Input
                        label="Session"
                        name="session"
                        required
                        value={formData.session}
                        onChange={handleChange}
                    />

                    <Select
                        label="Class"
                        name="class"
                        required
                        value={formData.class}
                        onChange={handleChange}
                        options={["Play", "One", "Two", "Three", "Four", "Five"]}
                    />

                    <Select
                        label="Shift"
                        name="shift"
                        required
                        value={formData.shift}
                        onChange={handleChange}
                        options={["Morning", "Day"]}
                    />

                    <Select
                        label="Section"
                        name="section"
                        required
                        value={formData.section}
                        onChange={handleChange}
                        options={["A", "B", "C"]}
                    />

                    <Input
                        label="Roll No"
                        name="roll"
                        required
                        value={formData.roll}
                        onChange={handleChange}
                    />

                    <Input
                        label="Student Name"
                        name="studentName"
                        required
                        value={formData.studentName}
                        onChange={handleChange}
                    />

                    <Input
                        label="Father Name"
                        name="fatherName"
                        required
                        value={formData.fatherName}
                        onChange={handleChange}
                    />

                    <Input
                        label="Mother Name"
                        name="motherName"
                        required
                        value={formData.motherName}
                        onChange={handleChange}
                    />

                    <Select
                        label="Gender"
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                        options={["Male", "Female", "Other"]}
                    />

                    <Select
                        label="Religion"
                        name="religion"
                        required
                        value={formData.religion}
                        onChange={handleChange}
                        options={["Islam", "Hindu", "Christian", "Buddhist"]}
                    />

                    <Select
                        label="Blood Group"
                        name="bloodGroup"
                        required
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        options={[
                            "A+",
                            "A-",
                            "B+",
                            "B-",
                            "AB+",
                            "AB-",
                            "O+",
                            "O-",
                        ]}
                    />

                    <Input
                        label="Guardian Mobile Phone No"
                        name="guardianPhone"
                        required
                        value={formData.guardianPhone}
                        onChange={handleChange}
                    />

                    <Input
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                    />

                    <Input
                        label="Birth Registration No"
                        name="birthRegistration"
                        value={formData.birthRegistration}
                        onChange={handleChange}
                    />
                </div>

                {/* Address */}

                <div className="mt-5 space-y-4">
                    <TextArea
                        label="Present Address"
                        name="presentAddress"
                        value={formData.presentAddress}
                        onChange={handleChange}
                    />

                    <TextArea
                        label="Permanent Address"
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleChange}
                    />
                </div>

                {/* Bottom */}

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 mt-5">

                    <Select
                        label="Freedom Fighter"
                        name="freedomFighter"
                        required
                        value={formData.freedomFighter}
                        onChange={handleChange}
                        options={["No", "Child", "Grandchild"]}
                    />

                    <Select
                        label="Disability"
                        name="disability"
                        required
                        value={formData.disability}
                        onChange={handleChange}
                        options={["No", "Yes"]}
                    />

                    <Select
                        label="Scholarship"
                        name="scholarship"
                        required
                        value={formData.scholarship}
                        onChange={handleChange}
                        options={["No", "Yes"]}
                    />

                    <Select
                        label="Stipend"
                        name="stipend"
                        required
                        value={formData.stipend}
                        onChange={handleChange}
                        options={["No", "Yes"]}
                    />

                </div>

                <p className="text-red-600 font-semibold mt-6">
                    * Mandatory Fields.
                </p>

                <div className="flex justify-center gap-5 mt-8">
                    <button
                        type="submit"
                        className="px-12 py-2 border-2 border-blue-600 rounded-lg text-blue-600 font-semibold hover:bg-blue-600 hover:text-white duration-200"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        className="px-12 py-2 border-2 border-blue-600 rounded-lg text-blue-600 font-semibold hover:bg-blue-600 hover:text-white duration-200"
                    >
                        Go Home
                    </button>
                </div>
            </form>
        </div>
    );
}

/* ---------- Components ---------- */

function Input({
    label,
    required,
    type = "text",
    ...props
}) {
    return (
        <div className="grid grid-cols-[170px_1fr] items-center gap-3">
            <label className="font-semibold text-purple-900 text-right">
                {label} :
                {required && <span className="text-red-500"> *</span>}
            </label>

            <input
                type={type}
                className="border border-gray-300 h-10 px-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                {...props}
            />
        </div>
    );
}

function Select({
    label,
    options,
    required,
    ...props
}) {
    return (
        <div className="grid grid-cols-[170px_1fr] items-center gap-3">
            <label className="font-semibold text-purple-900 text-right">
                {label} :
                {required && <span className="text-red-500"> *</span>}
            </label>

            <select
                className="border border-gray-300 h-10 px-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                {...props}
            >
                <option value="">Select {label}</option>

                {options.map((item) => (
                    <option key={item}>{item}</option>
                ))}
            </select>
        </div>
    );
}

function TextArea({ label, ...props }) {
    return (
        <div className="grid grid-cols-[170px_1fr] items-start gap-3">
            <label className="font-semibold text-purple-900 text-right pt-2">
                {label} :
            </label>

            <textarea
                rows={2}
                className="border border-gray-300 p-2 w-full resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                {...props}
            />
        </div>
    );
}