import { z } from "zod";

// 👉 base schema (pick/omit করার জন্য safe)
export const zodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  subject: z.string().min(2, "Name must be at least 2 characters").max(100),
  designation: z.string().min(2, "Name must be at least 2 characters").max(100),

  birthDate: z.coerce.date({
    errorMap: () => ({ message: "Invalid birth date" }),
  }),

  retirementDate: z.coerce.date({
    errorMap: () => ({ message: "Invalid retirementDate date" }),
  }),

  joiningDate: z.coerce.date({
    errorMap: () => ({ message: "Invalid joining date" }),
  }),
  image: z.instanceof(File).optional(),
});
