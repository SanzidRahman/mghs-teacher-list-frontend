"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { zSchema } from "@/lib/zSchema";
import { useRouter } from "next/navigation";
import z from "zod";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import axios from "axios";
import Link from "next/link";
import {
  ADMIN_DASHBOARD,
  USER_DASHBOARD,
  WEBSITE_REGISTER,
} from "@/lib/AdminPanelRoute";
import toast from "react-hot-toast";

const LoginPage = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema
    .pick({ email: true })
    .extend({
      password: z.string().min(4, "Minimum 4 characters required"),
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: response } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, values);

      if (!response.success) throw new Error(response.message);
      toast.success(response.message)

      reset();
      route.push(
        response.user.role === "admin" ? ADMIN_DASHBOARD : USER_DASHBOARD
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex mt-10 justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-blue-900 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">Login</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Please enter your credentials
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-2">
          {/* Email or Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={isTypePassword ? "password" : "text"}
                {...register("password")}
                placeholder="********"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setIsTypePassword(!isTypePassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {isTypePassword ? (
                  <FaRegEyeSlash size={18} />
                ) : (
                  <FaRegEye size={18} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2 text-sm">
          <p>
            Don’t have an account?{" "}
            <Link
              href={WEBSITE_REGISTER}
              className="text-blue-600 hover:underline font-medium"
            >
              Create Account
            </Link>
          </p>
          <Link
            href={"/"}
            className="text-blue-600 hover:underline block"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>

  );
};

export default LoginPage



