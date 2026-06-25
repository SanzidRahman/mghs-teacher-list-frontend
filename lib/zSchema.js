import { z } from "zod";

const emailRegex = /^\S+@\S+\.\S+$/;
const phoneRegex = /^01[3-9]\d{8}$/; // BD phone

export const zSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),

  emailOrPhone: z
    .string()
    .min(1, "Email or Phone is required")
    .refine((value) => emailRegex.test(value) || phoneRegex.test(value), {
      message: "Enter a valid email or phone number",
    }),

  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(50, "Slug must not exceed 50 characters"),

  email: z.string().email("Invalid email address"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be a 6-digit number"),

  date_of_birth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  joining_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),

  phone_number: z
    .string()
    .trim()
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
  pds_id: z.string().trim(),

  subject: z
    .string()
    .min(2, "subject must be at least 2 characters")
    .max(50, "subject must not exceed 50 characters"),

  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(100, "Password must not exceed 100 characters"),

  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  genre: z.string().min(3, "genre must be at least 3 charecter"),
  author: z.string().min(3, "Ahthor must be at least 3 charecter"),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description must not exceed 500 characters"),
  designation: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(50, "Description must not exceed 500 characters"),

  alt: z
    .string()
    .min(3, "Alt text must be at least 3 characters")
    .max(100, "Alt text must not exceed 100 characters"),

  _id: z.string().min(1, "ID is required"),

  category: z.string().min(1, "Category is required"),
  code: z.string().min(3, "code is required"),

  mrp: z.coerce.number().min(0, "MRP must be 0 or greater"),
  offer: z.string(),

  sellingPrice: z.coerce.number().min(0, "Selling price must be 0 or greater"),
  validity: z.coerce.date(),

  discountPercentage: z.coerce
    .number()
    .min(0, "Discount must be 0 or greater")
    .max(100, "Discount cannot exceed 100"),
  minShoppingAmount: z.coerce
    .number()
    .min(1000, "Discount must be 0 or greater"),

  product: z.string().min(1, "Category is required"),
  color: z.string().min(1, "color is required"),
  sku: z.string().min(1, "sku is required"),
  size: z.string().min(1, "size is required"),
  media: z.array(z.string()).min(1, "At least one media is required"),

  status: z.enum(["pending", "in-progress", "completed"]),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),

  address: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(100, "Description must not exceed 500 characters"),

  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),

  type: z.enum([
    "QUANTITY_DISCOUNT",
    "SPECIAL_PRICE",
    "PERCENTAGE",
    "FIXED_AMOUNT",
  ]),

  buyQuantity: z
    .number({
      required_error: "Buy quantity is required",
    })
    .min(1, "Buy quantity must be at least 1"),

  discountPercentage: z
    .number()
    .min(0, "Percentage cannot be negative")
    .max(100, "Percentage cannot exceed 100")
    .optional()
    .default(0),

  discountAmount: z
    .number()
    .min(0, "Discount amount cannot be negative")
    .optional()
    .default(0),

  offerPrice: z
    .number()
    .min(0, "Offer price cannot be negative")
    .optional()
    .default(0),

  isActive: z.boolean().optional().default(true),

  startDate: z.coerce.date().optional(),

  endDate: z.coerce.date().optional(),
});
