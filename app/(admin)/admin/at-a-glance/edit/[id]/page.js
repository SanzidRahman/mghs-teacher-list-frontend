'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const initialFormData = {
    eiin: "",
    schoolNameBn: "",
    schoolNameEn: "",
    address: "",
    wardNo: "",
    unionPourashava: "",
    postOffice: "",
    postCode: "",
    policeStation: "",
    upazila: "",
    district: "",
    division: "",
    telephone: "",
    email: "",
    website: "",
    studentCount: "",
    schoolShift: "",
    schoolType: "",
    probhatiShift: "",
    dibaShift: "",
    noShift: "",
    landArea: "",
    buildingCount: "",
    totalClassrooms: "",
    multimediaClassrooms: "",
    ictLabs: "",
    scienceLabs: "",
    libraryRooms: "",
    hasAuditorium: "",
    hasBoundaryWall: ""
};

const SchoolProfileEdit = ({ params }) => {
    const { id } = React.use(params)

    // Initialize state with empty strings or default values matching your screenshot
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false)



    useEffect(() => {
        if (!id) return;

        const getSchool = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/schoolInfo/${id}`
                );
                const result = data.data;      // This is the array you logged
                // If result is an array, take the first item; otherwise use as-is
                const schoolData = Array.isArray(result) ? result[0] : result;
                setFormData(schoolData || initialFormData); // fallback if empty
                setIsEdit(true);

            } catch (error) {
                toast.error("Failed to load school information.");
            } finally {
                setLoading(false);
            }
        };

        getSchool();
    }, [id]);




    // Handler to update form fields dynamically
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            let response;

            if (isEdit) {
                response = await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/schoolInfo/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            } else {
                response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/schoolInfo`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            }

            toast.success(response.data.message);

            if (!isEdit) {
                setFormData(initialFormData);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };




    // Shared input styling class to keep layout neat and clean
    const inputStyle = "w-full p-1 px-2 border border-blue-200 rounded focus:outline-none focus:border-blue-500 font-semibold text-gray-800 bg-blue-50/30";

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center justify-start font-sans">
            <form onSubmit={handleSubmit} className="w-full max-w-5xl bg-white border border-gray-300 shadow-md text-sm md:text-base text-black mb-8">

                {/* Header banner matching original color palette */}
                <div className="bg-[#e9edf4] border-b border-gray-300 py-3 text-center font-bold text-lg text-gray-800">
                    এক নজরে বিদ্যালয়ের পরিচিতি (পূরণযোগ্য ফরম)
                </div>

                {/* Row 1: EIIN */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="md:col-span-1 bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        বিদ্যালয়ের EIIN :
                    </div>
                    <div className="md:col-span-3 p-2 pl-4">
                        <input type="text" name="eiin" value={formData.eiin} onChange={handleChange} className={inputStyle} />
                    </div>
                </div>

                {/* Row 2: School Name (Bengali) */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="md:col-span-1 bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        বিদ্যালয়ের নাম :
                    </div>
                    <div className="md:col-span-3 p-2 pl-4">
                        <input type="text" name="schoolNameBn" value={formData.schoolNameBn} onChange={handleChange} className={`${inputStyle} font-bold`} />
                    </div>
                </div>

                {/* Row 3: School Name (English) */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="md:col-span-1 bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        SCHOOL NAME :
                    </div>
                    <div className="md:col-span-3 p-2 pl-4">
                        <input type="text" name="schoolNameEn" value={formData.schoolNameEn} onChange={handleChange} className={`${inputStyle} font-bold uppercase`} />
                    </div>
                </div>

                {/* Row 4: Address/Road */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="md:col-span-1 bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        গ্রাম/বাড়ী ও সড়কের বিবরণ :
                    </div>
                    <div className="md:col-span-3 p-2 pl-4">
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputStyle} />
                    </div>
                </div>

                {/* Row 5: Ward & Union/Pourashava */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        ওয়ার্ড নম্বর :
                    </div>
                    <div className="p-2 pl-4 border-r border-gray-300">
                        <input type="text" name="wardNo" value={formData.wardNo} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        ইউনিয়ন/পৌরসভা/সিটি কর্পোরেশন :
                    </div>
                    <div className="p-2 pl-4">
                        <input type="text" name="unionPourashava" value={formData.unionPourashava} onChange={handleChange} className={inputStyle} />
                    </div>
                </div>

                {/* Row 6: Post Office & Post Code */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        পোস্ট অফিস :
                    </div>
                    <div className="p-2 pl-4 border-r border-gray-300">
                        <input type="text" name="postOffice" value={formData.postOffice} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        পোস্ট কোড :
                    </div>
                    <div className="p-2 pl-4">
                        <input type="text" name="postCode" value={formData.postCode} onChange={handleChange} className={inputStyle} />
                    </div>
                </div>

                {/* Row 7: Police Station & Upazila */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        পুলিশ স্টেশন :
                    </div>
                    <div className="p-2 pl-4 border-r border-gray-300">
                        <input type="text" name="policeStation" value={formData.policeStation} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        উপজেলা :
                    </div>
                    <div className="p-2 pl-4">
                        <input type="text" name="upazila" value={formData.upazila} onChange={handleChange} className={inputStyle} />
                    </div>
                </div>

                {/* Row 8: District & Division */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        জেলা :
                    </div>
                    <div className="p-2 pl-4 border-r border-gray-300">
                        <input type="text" name="district" value={formData.district} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        বিভাগ :
                    </div>
                    <div className="p-2 pl-4">
                        <input type="text" name="division" value={formData.division} onChange={handleChange} className={inputStyle} />
                    </div>
                </div>

                {/* Row 9: Telephone & E-Mail */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        টেলিফোন :
                    </div>
                    <div className="p-2 pl-4 border-r border-gray-300">
                        <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        E-Mail :
                    </div>
                    <div className="p-2 pl-4">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className={`${inputStyle} text-blue-600 lowercase`} />
                    </div>
                </div>

                {/* Row 10: Website & Student Count */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        Website :
                    </div>
                    <div className="p-2 pl-4 border-r border-gray-300">
                        <input type="text" name="website" value={formData.website} onChange={handleChange} className={`${inputStyle} text-red-600 underline`} />
                    </div>
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        শিক্ষার্থীর সংখ্যা :
                    </div>
                    <div className="p-2 pl-4">
                        <input type="text" name="studentCount" value={formData.studentCount} onChange={handleChange} className={`${inputStyle} text-red-600 font-bold`} />
                    </div>
                </div>

                {/* Row 11: Shifts & Type */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        বিদ্যালয়ের শিফট :
                    </div>
                    <div className="p-2 pl-4 border-r border-gray-300">
                        <input type="text" name="schoolShift" value={formData.schoolShift} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        বিদ্যালয়ের ধরণ :
                    </div>
                    <div className="p-2 pl-4">
                        <input type="text" name="schoolType" value={formData.schoolType} onChange={handleChange} className={inputStyle} />
                    </div>
                </div>

                {/* Row 12: Class Activities (Shift Breakdown inputs) */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-start">
                    <div className="md:col-span-1 bg-gray-50/50 p-4 font-bold text-right pr-4 border-r border-gray-300 md:h-full flex items-center justify-end self-stretch">
                        শ্রেণি কার্যক্রম :
                    </div>
                    <div className="md:col-span-3 p-3 pl-4 space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="font-bold whitespace-nowrap text-sm w-24">প্রভাতি শিফট :</span>
                            <input type="text" name="probhatiShift" value={formData.probhatiShift} onChange={handleChange} className={inputStyle} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold whitespace-nowrap text-sm w-24">দিবা শিফট :</span>
                            <input type="text" name="dibaShift" value={formData.dibaShift} onChange={handleChange} className={inputStyle} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold whitespace-nowrap text-sm w-24">শিফট বিহীন :</span>
                            <input type="text" name="noShift" value={formData.noShift} onChange={handleChange} className={inputStyle} />
                        </div>
                    </div>
                </div>

                {/* Row 13: Land Area & Total Buildings */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        মোট জমির পরিমান (একর) :
                    </div>
                    <div className="p-2 pl-4 border-r border-gray-300">
                        <input type="text" name="landArea" value={formData.landArea} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        ভবন সংখ্যা :
                    </div>
                    <div className="p-2 pl-4">
                        <input type="text" name="buildingCount" value={formData.buildingCount} onChange={handleChange} className={inputStyle} />
                    </div>
                </div>

                {/* Row 14: Total Classrooms & Multimedia Classrooms */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        মোট শ্রেণিকক্ষ সংখ্যা :
                    </div>
                    <div className="p-2 pl-4 border-r border-gray-300">
                        <input type="text" name="totalClassrooms" value={formData.totalClassrooms} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        মাল্টিমিডিয়া শ্রেণিকক্ষ সংখ্যা :
                    </div>
                    <div className="p-2 pl-4">
                        <input type="text" name="multimediaClassrooms" value={formData.multimediaClassrooms} onChange={handleChange} className={inputStyle} />
                    </div>
                </div>

                {/* Row 15: ICT Labs & Science Labs */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        আইসিটি ল্যাব সংখ্যা :
                    </div>
                    <div className="p-2 pl-4 border-r border-gray-300">
                        <input type="text" name="ictLabs" value={formData.ictLabs} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        বিজ্ঞানাগার এর জন্য কক্ষ সংখ্যা :
                    </div>
                    <div className="p-2 pl-4">
                        <input type="text" name="scienceLabs" value={formData.scienceLabs} onChange={handleChange} className={inputStyle} />
                    </div>
                </div>

                {/* Row 16: Library & Auditorium status */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 items-center">
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        পাঠাগার এর জন্য কক্ষ সংখ্যা :
                    </div>
                    <div className="p-2 pl-4 border-r border-gray-300">
                        <input type="text" name="libraryRooms" value={formData.libraryRooms} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        অডিটোরিয়াম আছে কি না :
                    </div>
                    <div className="p-2 pl-4">
                        <input type="text" name="hasAuditorium" value={formData.hasAuditorium} onChange={handleChange} className={inputStyle} />
                    </div>
                </div>

                {/* Row 17: Boundary Wall status */}
                <div className="grid grid-cols-1 md:grid-cols-4 items-center">
                    <div className="bg-gray-50/50 p-2.5 font-bold text-right pr-4 border-r border-gray-300 self-stretch flex items-center justify-end">
                        সীমানা প্রাচীর আছে কি না :
                    </div>
                    <div className="p-2 pl-4 md:col-span-3">
                        <input type="text" name="hasBoundaryWall" value={formData.hasBoundaryWall} onChange={handleChange} className={inputStyle} />
                    </div>
                </div>

                {/* Form Action Controls */}
                <div className="bg-gray-50 border-t border-gray-300 p-4 flex justify-end space-x-3">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer"
                    >
                        Update SchoolInfo
                    </button>
                </div>

            </form>
        </div>
    );
}

export default SchoolProfileEdit


