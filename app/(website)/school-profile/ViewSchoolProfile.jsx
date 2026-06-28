// app/school-profile/ViewSchoolProfile.tsx

"use client";

import React, { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ViewSchoolProfile({ eiin }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    `${API_URL}/api/schoolInfo?eiin=${eiin}`
                );

                const data = await res.json();

                if (!data.success) {
                    throw new Error(data.message || "Failed to load data");
                }

                setProfile(data.data);
            } catch {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        if (eiin) fetchProfile();
    }, [eiin]);

    // 🔵 Loading UI
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full mx-auto mb-3" />
                    <p>লোড হচ্ছে...</p>
                </div>
            </div>
        );
    }

    // 🔴 Error UI
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600">
                {error}
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-5xl bg-white shadow border text-sm">

                {/* Header */}
                <div className="bg-gray-100 p-3 font-bold text-center">
                    এক নজরে বিদ্যালয়ের পরিচিতি
                </div>

                {/* EIIN */}
                <Row label="বিদ্যালয়ের EIIN" value={profile.eiin} />

                {/* School Name BN */}
                <Row label="বিদ্যালয়ের নাম" value={profile.schoolNameBn} strong />

                {/* School Name EN */}
                <Row label="SCHOOL NAME" value={profile.schoolNameEn} uppercase />

                {/* Address */}
                <Row label="ঠিকানা" value={profile.address || "-"} />

                {/* Grid Row Example */}
                <GridRow
                    leftLabel="ওয়ার্ড"
                    leftValue={profile.wardNo}
                    rightLabel="উপজেলা"
                    rightValue={profile.upazila}
                />

                <GridRow
                    leftLabel="জেলা"
                    leftValue={profile.district}
                    rightLabel="বিভাগ"
                    rightValue={profile.division}
                />

                <GridRow
                    leftLabel="ফোন"
                    leftValue={profile.telephone}
                    rightLabel="ইমেইল"
                    rightValue={profile.email}
                />

                <GridRow
                    leftLabel="শিক্ষার্থী"
                    leftValue={profile.studentCount}
                    rightLabel="ভবন"
                    rightValue={profile.buildingCount}
                />
            </div>
        </div>
    );
}

/* ---------------- UI HELPERS ---------------- */

function Row({
    label,
    value,
    strong = false,
    uppercase = false,
}) {
    return (
        <div className="flex border-b">
            <div className="w-1/3 p-2 font-semibold border-r">{label}</div>
            <div
                className={`w-2/3 p-2 ${strong ? "font-bold" : ""
                    } ${uppercase ? "uppercase" : ""}`}
            >
                {value}
            </div>
        </div>
    );
}

function GridRow({
    leftLabel,
    leftValue,
    rightLabel,
    rightValue,
}) {
    return (
        <div className="grid grid-cols-2 border-b">
            <div className="flex border-r">
                <div className="w-1/2 p-2 font-semibold">{leftLabel}</div>
                <div className="w-1/2 p-2">{leftValue || "-"}</div>
            </div>

            <div className="flex">
                <div className="w-1/2 p-2 font-semibold">{rightLabel}</div>
                <div className="w-1/2 p-2">{rightValue || "-"}</div>
            </div>
        </div>
    );
}