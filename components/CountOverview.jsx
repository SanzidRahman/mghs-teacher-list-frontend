"use client";
import Link from "next/link";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { ADMIN_AT_A_GLANCE_ADD, ADMIN_HISTORY_ADD } from "@/lib/AdminPanelRoute";


const CountOverview = () => {
  // const { data: countData } = useFetch("/api/dashboard/admin/count");

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-2 sm:gap-10 ">
      <Link href={ADMIN_AT_A_GLANCE_ADD}>
        <div className=" p-3 gap-2 rounded-lg border shadow border-l-4 border-l-green-400 bg-white  ">
          <h1>এক নজরে</h1>
        </div>
      </Link>
      <Link href={ADMIN_HISTORY_ADD}>
        <div className=" p-3 gap-2 rounded-lg border shadow border-l-4 border-l-red-400 bg-white  ">
          <h1>সংক্ষিপ্ত ইতিহাস</h1>
        </div>
      </Link>
      <Link href={"/"}>
        <div className=" p-3 gap-2 rounded-lg border shadow border-l-4 border-l-blue-400 bg-white  ">
          <h1>সংক্ষিপ্ত ইতিহাস</h1>
        </div>
      </Link>
      <Link href={"/"}>
        <div className=" p-3 gap-2 rounded-lg border shadow border-l-4 border-l-purple-400 bg-white  ">
          <h1>সংক্ষিপ্ত ইতিহাস</h1>
        </div>
      </Link>
      <Link href={"/"}>
        <div className=" p-3 gap-2 rounded-lg border shadow border-l-4 border-l-violet-400 bg-white  ">
          <h1>সংক্ষিপ্ত ইতিহাস</h1>
        </div>
      </Link>
      <Link href={"/"}>
        <div className=" p-3 gap-2 rounded-lg border shadow border-l-4 border-l-pink-400 bg-white  ">
          <h1>সংক্ষিপ্ত ইতিহাস</h1>
        </div>
      </Link>


    </div>
  );
};

export default CountOverview;
