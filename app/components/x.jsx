"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const AllTeacherMRT = () => {
  //
  const fetchTeacher = async ({ pageParam }) => {
    const res = await axios.get(`http://localhost:5000/api/teacher`);
    return res;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["teacher"],
    queryFn: fetchTeacher,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  console.log(data);

  return <div></div>;
};

export default AllTeacherMRT;
