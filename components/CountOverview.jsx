"use client";
import Link from "next/link";
import React from "react";
import { ADMIN_AT_A_GLANCE_ADD, ADMIN_TEACHER_ADD, ADMIN_UPLOADFILE_ADD } from "@/lib/AdminPanelRoute";


const CountOverview = () => {


  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-2 sm:gap-10 ">
      <Link href={ADMIN_AT_A_GLANCE_ADD}>
        <div className=" p-3 gap-2 rounded-lg border shadow border-l-4 border-l-green-400 bg-white  ">
          <h1>এক নজরে</h1>
        </div>
      </Link>

      <Link href={ADMIN_TEACHER_ADD}>
        <div className=" p-3 gap-2 rounded-lg border shadow border-l-4 border-l-blue-400 bg-white  ">
          <h1>শিক্ষক সংযুক্তি</h1>
        </div>
      </Link>
      <Link href={ADMIN_UPLOADFILE_ADD}>
        <div className=" p-3 gap-2 rounded-lg border shadow border-l-4 border-l-purple-400 bg-white  ">
          <h1>নোটিশ সংযুক্তি</h1>
        </div>
      </Link>



    </div>
  );
};

export default CountOverview;
