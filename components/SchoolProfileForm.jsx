'use client';

import React, { useState } from 'react';
import axios from 'axios';
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

export default function SchoolProfileForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleClear = () => setFormData(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/schoolInfo`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success(data?.message || "School information saved successfully.");
      setFormData(initialFormData);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to save school information."
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    ["eiin", "বিদ্যালয়ের EIIN", "text"],
    ["schoolNameBn", "বিদ্যালয়ের নাম", "text"],
    ["schoolNameEn", "SCHOOL NAME", "text"],
    ["address", "গ্রাম/বাড়ী ও সড়কের বিবরণ", "text"],
    ["wardNo", "ওয়ার্ড নম্বর", "text"],
    ["unionPourashava", "ইউনিয়ন/পৌরসভা", "text"],
    ["postOffice", "পোস্ট অফিস", "text"],
    ["postCode", "পোস্ট কোড", "text"],
    ["policeStation", "পুলিশ স্টেশন", "text"],
    ["upazila", "উপজেলা", "text"],
    ["district", "জেলা", "text"],
    ["division", "বিভাগ", "text"],
    ["telephone", "টেলিফোন", "text"],
    ["email", "E-Mail", "email"],
    ["website", "Website", "url"],
    ["studentCount", "শিক্ষার্থীর সংখ্যা", "number"],
    ["schoolShift", "বিদ্যালয়ের শিফট", "text"],
    ["schoolType", "বিদ্যালয়ের ধরণ", "text"],
    ["probhatiShift", "প্রভাতি শিফট", "text"],
    ["dibaShift", "দিবা শিফট", "text"],
    ["noShift", "শিফট বিহীন", "text"],
    ["landArea", "মোট জমির পরিমান (একর)", "number"],
    ["buildingCount", "ভবন সংখ্যা", "number"],
    ["totalClassrooms", "মোট শ্রেণিকক্ষ সংখ্যা", "number"],
    ["multimediaClassrooms", "মাল্টিমিডিয়া শ্রেণিকক্ষ", "number"],
    ["ictLabs", "আইসিটি ল্যাব সংখ্যা", "number"],
    ["scienceLabs", "বিজ্ঞানাগার কক্ষ সংখ্যা", "number"],
    ["libraryRooms", "পাঠাগার কক্ষ সংখ্যা", "number"],
    ["hasAuditorium", "অডিটোরিয়াম আছে?", "text"],
    ["hasBoundaryWall", "সীমানা প্রাচীর আছে?", "text"],
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-blue-100 p-4 text-center text-xl font-bold">
          এক নজরে বিদ্যালয়ের পরিচিতি
        </div>

        <div className="grid md:grid-cols-2 gap-4 p-6">
          {fields.map(([name, label, type]) => (
            <div key={name}>
              <label className="block mb-1 font-semibold">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t">
          <button type="button" onClick={handleClear} className="px-5 py-2 bg-gray-300 rounded">
            Clear
          </button>
          <button disabled={loading} type="submit" className="px-5 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400">
            {loading ? "Saving..." : "Save Data"}
          </button>
        </div>
      </form>
    </div>
  );
}
