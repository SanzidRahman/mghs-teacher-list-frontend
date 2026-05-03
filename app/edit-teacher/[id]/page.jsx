"use client";

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodSchema } from "@/lib/zSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import axios from "axios";
import dayjs from "dayjs";

const UpdateTeacher = ({ params }) => {
  const { id } = React.use(params);

  // FORM SCHEMA
  const formSchema = zodSchema.pick({
    name: true,
    subject: true,
    designation: true,
    joiningDate: true,
    birthDate: true,
    image: true,
  });

  // REACT HOOK FORM
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      designation: "",
      joiningDate: "",
      birthDate: "",
      image: null,
    },
  });

  // FETCH SINGLE TEACHER
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/teacher/${id}`);

        const teacher = res.data;

        // FORM VALUE SET
        form.reset({
          name: teacher.name || "",
          subject: teacher.subject || "",
          designation: teacher.designation || "",
          joiningDate: dayjs(teacher.joiningDate).format("YYYY-MM-DD"),
          birthDate: dayjs(teacher.birthDate).format("YYYY-MM-DD"),
          image: null,
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    if (id) {
      fetchTeacher();
    }
  }, [id, form]);

  // SUBMIT
  const handleTeacherSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("subject", data.subject);
      formData.append("designation", data.designation);
      formData.append(
        "joiningDate",
        dayjs(data.joiningDate).format("YYYY-MM-DD"),
      );
      formData.append("birthDate", dayjs(data.birthDate).format("YYYY-MM-DD"));
      // IMAGE OPTIONAL
      if (data.image) {
        formData.append("image", data.image);
      }

      // UPDATE API
      const res = await axios.put(
        `http://localhost:5000/api/teacher/${id}`,
        formData,
      );

      form.reset();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex py-2 justify-center bg-gray-50 px-3 md:px-6">
      <Card className="w-full md:h-auto max-w-4xl rounded-2xl border shadow-xl">
        <CardHeader className="text-center space-y-2 pb-8">
          <CardTitle className="text-2xl md:text-4xl font-bold">
            Update Teacher
          </CardTitle>

          <CardDescription className="text-sm md:text-base text-gray-500">
            Update teacher information
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(handleTeacherSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* NAME */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="mb-2">Name</FieldLabel>

                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter Your Name"
                    className="h-11 rounded-xl"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* SUBJECT */}
            <Controller
              name="subject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="mb-2">Subject</FieldLabel>

                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter Subject"
                    className="h-11 rounded-xl"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* DESIGNATION */}
            <Controller
              name="designation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="mb-2">Designation</FieldLabel>

                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter Designation"
                    className="h-11 rounded-xl"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* BIRTH DATE */}
            <Controller
              name="birthDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="mb-2">Birth Date</FieldLabel>

                  <Input {...field} type="date" className="h-11 rounded-xl" />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* JOINING DATE */}
            <Controller
              name="joiningDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="mb-2">Joining Date</FieldLabel>

                  <Input {...field} type="date" className="h-11 rounded-xl" />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* IMAGE */}
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="mb-2">Image</FieldLabel>

                  <Input
                    type="file"
                    className="h-11 rounded-xl cursor-pointer"
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0] || null);
                    }}
                  />

                  <FieldDescription className="text-xs mt-2">
                    Upload teacher profile picture
                  </FieldDescription>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* BUTTON */}
            <div className="md:col-span-2 pt-2">
              <Button
                type="submit"
                className="w-full h-12 rounded-xl text-base font-medium cursor-pointer"
              >
                Update Teacher
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateTeacher;
