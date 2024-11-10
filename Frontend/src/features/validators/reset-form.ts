import { z } from "zod";

export const resetSchema = z.object({
  password: z.string({ message: "Password harus berupa string!" })
  .min(8, 'Password must be at least 8 characters'),
  c_password: z.string({ message: "Password harus berupa string!" }).min(8, 'Password must be at least 8 characters'),
}).refine(data => data.password === data.c_password, {path: ['c_password'], message: 'Password does not match'})