"use client";

import React from "react";
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

const CreateTeacher = () => {
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

      formData.append("image", data.image);

      const res = await axios.post(
        "http://localhost:5000/api/teacher",
        formData,
      );

      console.log(res.data);

      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-3 py-10 md:px-6">
      <Card className="w-full max-w-4xl rounded-2xl border shadow-xl">
        {/* HEADER */}
        <CardHeader className="text-center space-y-2 pb-8">
          <CardTitle className="text-2xl md:text-4xl font-bold">
            Teacher Application
          </CardTitle>

          <CardDescription className="text-sm md:text-base text-gray-500">
            Fill your information correctly
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
                Submit Application
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTeacher;
