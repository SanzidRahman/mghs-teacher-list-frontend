"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Api_Url } from "@/lib/api";




const schoolShowPage = () => {
  const [school, setSchool] = useState([]);
  const [loading, setLoading] = useState(true);

  const breadcrumbItems = [
    { label: "Admin Dashboard", href: "/admin/dashboard" },
    { label: "SchoolInfo", href: "#" },
  ];

  useEffect(() => {
    const fetchschools = async () => {
      try {
        const res = await axios.get(`${Api_Url}/api/schoolInfo/singleSchool`);

        setSchool(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchschools();
  }, []);

  console.log(school)


  return (
    <div className="w-full">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <h2 className="text-xl md:text-2xl font-bold">
            All schools
          </h2>

          <span className="text-sm text-gray-400">
            Total: {school.length}
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <p className="text-gray-400">Loading school...</p>
          </div>
        ) : school.length === 0 ? (
          <div className="text-center py-10 border rounded-lg">
            <p className="text-gray-400">No school found.</p>
          </div>
        ) : (
          <>
            {/* Desktop & Tablet Table */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-700">
              <table className="min-w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Eiin</th>
                    <th className="px-4 py-3 text-left">SchoolNameBn</th>
                    <th className="px-4 py-3 text-left">SchoolNameEn</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {school.map((school, index) => (
                    <tr
                      key={school._id}
                      className="border-t border-gray-700 hover:bg-gray-800 transition"
                    >
                      <td className="px-4 py-3 text-center">{index + 1}</td>
                      <td className="px-2 border-l border-gray-700 py-3">{school.eiin}</td>

                      <td className="px-4 py-3 text-xs">
                        {school.schoolNameBn}
                      </td>

                      <td className="px-4 py-3 text-xs">
                        {school.schoolNameEn}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Link href={`/admin/at-a-glance/edit/${school._id}`} className="cursor-pointer px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
                            Edit
                          </Link>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid gap-4 md:hidden">
              {school.map((school) => (
                <div
                  key={school._id}
                  className="rounded-xl border border-gray-700 bg-teal-900/40 p-4 shadow"
                >
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-white">
                        Name
                      </p>
                      <p className="font-semibold">
                        {school.eiin}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-white">
                        Designation
                      </p>
                      <p>{school.schoolNameBn}</p>
                    </div>

                    <div>
                      <p className="text-xs text-white">
                        Subject
                      </p>
                      <p>{school.schoolNameEn}</p>
                    </div>



                    <div className="flex gap-2 pt-3">

                      <Link href={`/admin/at-a-glance/edit/${school._id}`} className="cursor-pointer flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded">
                        Edit
                      </Link>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default schoolShowPage;