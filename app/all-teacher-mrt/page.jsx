"use client";
import React, { useMemo } from "react";
import ReactMT from "../components/ReactMT";
import { DT_TEACHER_CLOUMNS } from "@/lib/columns";

const ShowTeacher = () => {
  const columns = useMemo(() => {
    return DT_TEACHER_CLOUMNS;
  }, []);
  return (
    <div>
      <ReactMT
        queryKey="teacher"
        fetchUrl="http://localhost:5000/api/teacher"
        columnsConfig={columns}
        initialPageSize={10}
        exportEndPoint="/"
        deleteEndPoint="/"
        trashView
        createAction
      />
    </div>
  );
};

export default ShowTeacher;
