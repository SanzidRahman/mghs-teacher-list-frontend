"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";



const TeacherShowPage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const breadcrumbItems = [
    { label: "Admin Dashboard", href: "/admin/dashboard" },
    { label: "All Pdfs", href: "#" },
  ];

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/pdfFile`);
        setPdfs(res.data.pdfData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);


  // handle Delete
  const handleDeletePdfs = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pdfs?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/pdfFile/${id}`);

      setPdfs((prev) =>
        prev.filter((pdfs) => pdfs._id !== id)
      );

      alert("pdfs deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete pdfs");
    }
  };




  return (
    <div className="w-full">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <h2 className="text-xl md:text-2xl font-bold">
            All Pdfs
          </h2>

          <span className="text-sm text-gray-400">
            Total: {pdfs.length}
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <p className="text-gray-400">Loading pdfs...</p>
          </div>
        ) : pdfs.length === 0 ? (
          <div className="text-center py-10 border rounded-lg">
            <p className="text-gray-400">No pdfs found.</p>
          </div>
        ) : (
          <>
            {/* Desktop & Tablet Table */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-700/40">
              <table className="min-w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {pdfs.map((pdf, index) => (
                    <tr
                      key={pdf._id}
                      className="border-t border-gray-700 hover:bg-gray-800 transition"
                    >
                      <td className="px-4 py-3 text-center">{index + 1}</td>
                      <td className="px-4 py-3 text-center">{pdf.title}</td>

                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Link href={`/admin/pdf-upload/edit/${pdf._id}`} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
                            Edit
                          </Link>

                          <button onClick={() => handleDeletePdfs(pdf._id)} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">
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
              {pdfs.map((pdf) => (
                <div
                  key={pdf._id}
                  className="rounded-xl border border-gray-700 bg-teal-900/40 p-4 shadow"
                >
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-white">
                        Name
                      </p>
                      <p className="font-semibold">
                        {pdf.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-white">
                        Designation
                      </p>
                      <p>{pdf.designation}</p>
                    </div>

                    <div>
                      <p className="text-xs text-white">
                        Subject
                      </p>
                      <p>{pdf.subject}</p>
                    </div>

                    <div>


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