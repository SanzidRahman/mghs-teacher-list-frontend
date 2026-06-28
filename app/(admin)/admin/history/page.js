"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Api_Url } from "@/lib/api";
import Link from "next/link";



const TeacherShowPage = () => {
  const [teachers, setTeacher] = useState([]);
  const [loading, setLoading] = useState(true);

  const breadcrumbItems = [
    { label: "Admin Dashboard", href: "/admin/dashboard" },
    { label: "All Teachers", href: "#" },
  ];

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get(`${Api_Url}/api/teacher`);
        setTeacher(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);


  // handle Delete
  const handleDeleteTeacher = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${Api_Url}/api/teacher/${id}`);

      setTeacher((prev) =>
        prev.filter((teacher) => teacher._id !== id)
      );

      alert("Teacher deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete teacher");
    }
  };


  return (
    <div className="w-full">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <h2 className="text-xl md:text-2xl font-bold">
            All Teachers
          </h2>

          <span className="text-sm text-gray-400">
            Total: {teachers.length}
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <p className="text-gray-400">Loading teachers...</p>
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-10 border rounded-lg">
            <p className="text-gray-400">No teachers found.</p>
          </div>
        ) : (
          <>
            {/* Desktop & Tablet Table */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-700">
              <table className="min-w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Designation</th>
                    <th className="px-4 py-3 text-left">Subject</th>
                    <th className="px-4 py-3 text-left">
                      Retirement Date
                    </th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr
                      key={teacher._id}
                      className="border-t border-gray-700 hover:bg-gray-800 transition"
                    >
                      <td className="px-4 py-3 text-center">{index + 1}</td>
                      <td className="px-2 border-l border-gray-700 py-3">{teacher.name}</td>

                      <td className="px-4 py-3">
                        {teacher.designation}
                      </td>

                      <td className="px-4 py-3">
                        {teacher.subject}
                      </td>

                      <td className="px-4 py-3">
                        {new Date(
                          teacher.retirementDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Link href={`/admin/teacher/edit/${teacher._id}`} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
                            Edit
                          </Link>

                          <button onClick={() => handleDeleteTeacher(teacher._id)} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid gap-4 md:hidden">
              {teachers.map((teacher) => (
                <div
                  key={teacher._id}
                  className="rounded-xl border border-gray-700 bg-teal-900/40 p-4 shadow"
                >
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-white">
                        Name
                      </p>
                      <p className="font-semibold">
                        {teacher.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-white">
                        Designation
                      </p>
                      <p>{teacher.designation}</p>
                    </div>

                    <div>
                      <p className="text-xs text-white">
                        Subject
                      </p>
                      <p>{teacher.subject}</p>
                    </div>

                    <div>
                      <p className="text-xs text-white">
                        Retirement Date
                      </p>
                      <p>
                        {new Date(
                          teacher.retirementDate
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-3">
                      <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded">
                        Edit
                      </button>

                      <button className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 rounded">
                        Delete
                      </button>
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

export default TeacherShowPage;