"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

// CSV PACKAGE
import { mkConfig, generateCsv, download } from "export-to-csv";

// DAYJS
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SubjectTeacherInformation = () => {
  const [teacher, setTeacher] = useState([]);
  const [subject, setSubject] = useState("");

  // GET DATA
  useEffect(() => {
    const getTeacher = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/teacher");

        setTeacher(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getTeacher();
  }, []);

  // FILTER
  const filterTeacher = teacher.filter((item) =>
    item.subject.toLowerCase().includes(subject.toLowerCase()),
  );

  // CSV CONFIG
  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: "teacher-information",
  });

  // EXPORT CSV
  const handleExport = () => {
    const csvData = filterTeacher.map((item, index) => ({
      Serial: index + 1,
      Name: item.name,
      Designation: item.designation,
      Subject: item.subject,
      BirthDate: dayjs(item.birthDate).format("DD MMM YYYY"),
      JoiningDate: dayjs(item.joiningDate).format("DD MMM YYYY"),
      RetirementDate: dayjs(item.retirementDate).format("DD MMM YYYY"),
    }));

    const csv = generateCsv(csvConfig)(csvData);

    download(csvConfig)(csv);
  };

  // handleDelete
  const handleDelete = async (id) => {
    try {
      // confirm before delete
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this teacher?",
      );

      if (!confirmDelete) return;

      // delete request
      const res = await axios.delete(`http://localhost:5000/api/teacher/${id}`);

      // remove deleted teacher from UI instantly
      setTeacher((prev) => prev.filter((item) => item._id !== id));

      console.log(res.data);
      alert("Teacher deleted successfully");
    } catch (error) {
      console.log(error.message);
      alert("Failed to delete teacher");
    }
  };

  return (
    <div className="px-3 md:px-6 lg:px-10 py-6">
      {/* TITLE */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Teacher Information
        </h1>

        <p className="text-center text-gray-500 mt-2 text-sm md:text-base">
          Search teachers by subject and export data as CSV
        </p>
      </div>

      {/* SEARCH + EXPORT */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          className="w-full h-10  border border-gray-300 rounded-xl px-4 outline-none focus:ring-2 focus:ring-black"
          type="search"
          placeholder="Search Subject..."
          onChange={(e) => setSubject(e.target.value)}
        />

        <button
          onClick={handleExport}
          className="w-full h-10  md:w-50 bg-blue-800 text-white px-6 rounded-xl hover:opacity-90 transition-all duration-300 cursor-pointer"
        >
          Export All Teacher
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-2xl border shadow-sm">
        <Table>
          <TableCaption className="py-5 text-gray-500">
            Total Teachers : {filterTeacher.length}
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[40px]">#</TableHead>

              <TableHead className="min-w-[200px]">Teacher</TableHead>

              <TableHead className="min-w-[160px]">Designation</TableHead>

              <TableHead className="min-w-[140px]">Subject</TableHead>

              <TableHead className="min-w-[140px]">Birth Date</TableHead>

              <TableHead className="min-w-[140px]">Joining Date</TableHead>

              <TableHead className="min-w-[160px]">Retirement Date</TableHead>

              <TableHead className="min-w-[160px]">Delete / Edit </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterTeacher.length > 0 ? (
              filterTeacher.map((item, index) => (
                <TableRow key={item._id}>
                  {/* SERIAL */}
                  <TableCell className="font-medium">{index + 1}</TableCell>

                  {/* TEACHER */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover border"
                      />

                      <div>
                        <h1 className="font-semibold">{item.name}</h1>

                        <p className="text-sm text-gray-500">
                          ID : {item._id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* DESIGNATION */}
                  <TableCell>
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {item.designation}
                    </span>
                  </TableCell>

                  {/* SUBJECT */}
                  <TableCell>
                    <span className="bg-black text-white px-4 py-2 rounded-full text-sm">
                      {item.subject}
                    </span>
                  </TableCell>

                  {/* DATES */}
                  <TableCell>
                    {dayjs(item.birthDate).format("DD MMM YYYY")}
                  </TableCell>

                  <TableCell>
                    {dayjs(item.joiningDate).format("DD MMM YYYY")}
                  </TableCell>

                  <TableCell>
                    {dayjs(item.retirementDate).format("DD MMM YYYY")}
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center items-center gap-2 ">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="cursor-pointer bg-red-500 text-white py-1.5 px-4"
                      >
                        Delete
                      </button>
                      <Link
                        href={`edit-teacher/${item._id}`}
                        className="cursor-pointer  bg-green-700 text-white py-1.5 px-4"
                      >
                        Edit
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-gray-500"
                >
                  No Teacher Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubjectTeacherInformation;
