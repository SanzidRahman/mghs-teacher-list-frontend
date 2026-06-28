"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_Url } from "@/lib/api";

const HeadTeacher = () => {
    const [teacher, setTeacher] = useState([]);

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

    const HT = teacher.find(
        (t) => t.designation === "Head Teacher"
    );

    if (!HT) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="bg-sky-500 text-white px-5 py-3 rounded-t-lg">
                <h2 className="font-bold">প্রধান শিক্ষক</h2>
            </div>

            <div className="p-2 text-center flex flex-col items-center">
                <Image
                    src={HT.image}
                    alt={HT.name}
                    width={250}
                    height={250}
                    className="rounded-lg object-cover"
                />

                <h3 className="mt-2 text-xl font-bold">
                    {HT.name}
                </h3>

                <p className="text-gray-600 mt-2">
                    {HT.designation}
                </p>
            </div>
        </div>
    );
};

export default HeadTeacher;