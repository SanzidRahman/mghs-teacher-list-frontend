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

import { mkConfig, generateCsv, download } from "export-to-csv";

// DAYJS
import dayjs from "dayjs";
import { Api_Url } from "@/lib/api";

const SubjectTeacherInformation = () => {
  const [teacher, setTeacher] = useState([]);
  const [subject, setSubject] = useState("");

  // GET DATA
  useEffect(() => {
    const getTeacher = async () => {
      try {
        const res = await axios.get(`${Api_Url}/api/teacher`);

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



  return (
    <div className="container mx-auto px-4 py-6">
      {/* TITLE */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          Teacher Information
        </h1>

        <p className="text-center text-gray-500 mt-2 text-sm md:text-base">
          Search teachers by subject and export data as CSV
        </p>
      </div>

      {/* SEARCH + EXPORT */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <input
          className="w-full h-11 border border-gray-300 rounded-xl px-4 outline-none focus:ring-2 focus:ring-black"
          type="search"
          placeholder="Search Subject..."
          onChange={(e) => setSubject(e.target.value)}
        />

        <button
          onClick={handleExport}
          className="w-full lg:w-auto min-w-[220px] h-11 bg-blue-800 text-white px-6 rounded-xl hover:opacity-90 transition"
        >
          Export All Teacher
        </button>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="grid gap-4 md:hidden">
        {filterTeacher.length > 0 ? (
          filterTeacher.map((item, index) => (
            <div
              key={item._id}
              className="bg-white border rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover border"
                />

                <div>
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="text-xs text-gray-500">
                    ID: {item._id.slice(0, 8)}...
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Serial:</span> {index + 1}
                </p>

                <p>
                  <span className="font-semibold">Designation:</span>{" "}
                  {item.designation}
                </p>

                <p>
                  <span className="font-semibold">Subject:</span> {item.subject}
                </p>

                <p>
                  <span className="font-semibold">Birth Date:</span>{" "}
                  {dayjs(item.birthDate).format("DD MMM YYYY")}
                </p>

                <p>
                  <span className="font-semibold">Joining Date:</span>{" "}
                  {dayjs(item.joiningDate).format("DD MMM YYYY")}
                </p>

                <p>
                  <span className="font-semibold">Retirement Date:</span>{" "}
                  {dayjs(item.retirementDate).format("DD MMM YYYY")}
                </p>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No Teacher Found
          </div>
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block">
        <div className="w-full overflow-x-auto rounded-2xl border shadow-sm">
          <Table className="min-w-[1100px]">
            <TableCaption className="py-5 text-gray-500">
              Total Teachers : {filterTeacher.length}
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Birth Date</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead>Retirement Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filterTeacher.length > 0 ? (
                filterTeacher.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3 min-w-[220px]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover border"
                        />

                        <div>
                          <h1 className="font-semibold">{item.name}</h1>

                          <p className="text-xs text-gray-500">
                            ID: {item._id.slice(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{item.designation}</TableCell>

                    <TableCell>
                      <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                        {item.subject}
                      </span>
                    </TableCell>

                    <TableCell>
                      {dayjs(item.birthDate).format("DD MMM YYYY")}
                    </TableCell>

                    <TableCell>
                      {dayjs(item.joiningDate).format("DD MMM YYYY")}
                    </TableCell>

                    <TableCell>
                      {dayjs(item.retirementDate).format("DD MMM YYYY")}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    No Teacher Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SubjectTeacherInformation;
