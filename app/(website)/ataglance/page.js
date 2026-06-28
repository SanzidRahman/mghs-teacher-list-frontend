'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ViewSchoolProfile() {
    const searchParams = useSearchParams();
    // Defaulting to '111829' from your screenshot if no ?eiin= is passed in the URL
    const eiin = searchParams.get('eiin') || '129695';

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                // Replace with your actual production backend URL if different
                const response = await fetch(`http://localhost:5000/api/schoolInfo?eiin=${eiin}`);
                const result = await response.json();

                if (result.success) {
                    setProfile(result.data);
                } else {
                    setError(result.message || 'Failed to fetch school profile.');
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Could not connect to the backend server.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [eiin]);

    // Loading Screen state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-semibold">তথ্য লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...</p>
                </div>
            </div>
        );
    }

    // Error Screen state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-sm max-w-md w-full text-center">
                    <p className="font-bold text-lg mb-2">ত্রুটি (Error)</p>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        );
    }

    // Fallback if record somehow isn't found
    if (!profile) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center items-start font-sans">
            <div className="w-full max-w-5xl bg-white border border-gray-300 shadow-sm text-sm md:text-base text-black">

                {/* Table Header */}
                <div className="bg-[#e9edf4] border-b border-gray-300 py-3 text-center font-bold text-lg text-gray-800">
                    এক নজরে বিদ্যালয়ের পরিচিতি
                </div>

                {/* Row 1: EIIN */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="md:col-span-1 bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        বিদ্যালয়ের EIIN :
                    </div>
                    <div className="md:col-span-3 bg-white p-2.5 pl-4 font-semibold">
                        {profile.eiin}
                    </div>
                </div>

                {/* Row 2: School Name (Bengali) */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="md:col-span-1 bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        বিদ্যালয়ের নাম :
                    </div>
                    <div className="md:col-span-3 bg-white p-2.5 pl-4 font-bold text-gray-900">
                        {profile.schoolNameBn}
                    </div>
                </div>

                {/* Row 3: School Name (English) */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="md:col-span-1 bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        SCHOOL NAME :
                    </div>
                    <div className="md:col-span-3 bg-white p-2.5 pl-4 font-bold uppercase text-gray-900 tracking-wide">
                        {profile.schoolNameEn}
                    </div>
                </div>

                {/* Row 4: Address/Road */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="md:col-span-1 bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        গ্রাম/বাড়ী ও সড়কের বিবরণ :
                    </div>
                    <div className="md:col-span-3 bg-white p-2.5 pl-4 font-semibold">
                        {profile.address || '-'}
                    </div>
                </div>

                {/* Row 5: Ward & Union/Pourashava */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        ওয়ার্ড নম্বর :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold border-r border-gray-300">
                        {profile.wardNo || '-'}
                    </div>
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        ইউনিয়ন/পৌরসভা/সিটি কর্পোরেশন :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold">
                        {profile.unionPourashava || '-'}
                    </div>
                </div>

                {/* Row 6: Post Office & Post Code */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        পোস্ট অফিস :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold border-r border-gray-300">
                        {profile.postOffice || '-'}
                    </div>
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        পোস্ট কোড :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold">
                        {profile.postCode || '-'}
                    </div>
                </div>

                {/* Row 7: Police Station & Upazila */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        পুলিশ স্টেশন :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold border-r border-gray-300">
                        {profile.policeStation || '-'}
                    </div>
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        উপজেলা :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold">
                        {profile.upazila || '-'}
                    </div>
                </div>

                {/* Row 8: District & Division */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        জেলা :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold border-r border-gray-300">
                        {profile.district || '-'}
                    </div>
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        বিভাগ :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold">
                        {profile.division || '-'}
                    </div>
                </div>

                {/* Row 9: Telephone & E-Mail */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        টেলিফোন :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold border-r border-gray-300">
                        {profile.telephone || '-'}
                    </div>
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        E-Mail :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold text-blue-600 lowercase break-all">
                        {profile.email || '-'}
                    </div>
                </div>

                {/* Row 10: Website & Student Count */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        Website :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold border-r border-gray-300 text-red-600 underline">
                        <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer">
                            {profile.website || '-'}
                        </a>
                    </div>
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        শিক্ষার্থীর সংখ্যা :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-bold text-red-600">
                        {profile.studentCount}
                    </div>
                </div>

                {/* Row 11: Shifts & Type */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        বিদ্যালয়ের শিফট :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold border-r border-gray-300">
                        {profile.schoolShift || '-'}
                    </div>
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        বিদ্যালয়ের ধরণ :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold">
                        {profile.schoolType || '-'}
                    </div>
                </div>

                {/* Row 12: Class Activities */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="md:col-span-1 bg-white p-4 font-bold text-right pr-4 border-r border-gray-300 flex items-center justify-end">
                        শ্রেণি কার্যক্রম :
                    </div>
                    <div className="md:col-span-3 bg-white p-4 pl-4 leading-relaxed font-semibold">
                        <div><span className="font-bold">প্রভাতি শিফট :</span> {profile.probhatiShift || '-'}</div>
                        <div><span className="font-bold">দিবা শিফট :</span> {profile.dibaShift || '-'}</div>
                        <div><span className="font-bold">শিফট বিহীন :</span> {profile.noShift || '-'}</div>
                    </div>
                </div>

                {/* Row 13: Land Area & Total Buildings */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        মোট জমির পরিমান (একর) :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold border-r border-gray-300">
                        {profile.landArea}
                    </div>
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        ভবন সংখ্যা :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold">
                        {profile.buildingCount}
                    </div>
                </div>

                {/* Row 14: Total Classrooms & Multimedia Classrooms */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        মোট শ্রেণিকক্ষ সংখ্যা :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold border-r border-gray-300">
                        {profile.totalClassrooms}
                    </div>
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        মাল্টিমিডিয়া শ্রেণিকক্ষ সংখ্যা :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold">
                        {profile.multimediaClassrooms}
                    </div>
                </div>

                {/* Row 15: ICT Labs & Science Labs */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        আইসিটি ল্যাব সংখ্যা :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold border-r border-gray-300">
                        {profile.ictLabs}
                    </div>
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        বিজ্ঞানাগার এর জন্য কক্ষ সংখ্যা :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold">
                        {profile.scienceLabs}
                    </div>
                </div>

                {/* Row 16: Library & Auditorium status */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 text-xs">
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        পাঠাগার এর জন্য কক্ষ সংখ্যা :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold border-r border-gray-300">
                        {profile.libraryRooms}
                    </div>
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        অডিটোরিয়াম আছে কি না :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold">
                        {profile.hasAuditorium}
                    </div>
                </div>

                {/* Row 17: Boundary Wall status */}
                <div className="grid grid-cols-1 md:grid-cols-4 text-xs">
                    <div className="bg-white p-2.5 font-bold text-right pr-4 border-r border-gray-300">
                        সীমানা প্রাচীর আছে কি না :
                    </div>
                    <div className="bg-white p-2.5 pl-4 font-semibold col-span-3">
                        {profile.hasBoundaryWall}
                    </div>
                </div>

            </div>
        </div>
    );
}