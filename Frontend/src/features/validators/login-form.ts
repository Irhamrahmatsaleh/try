import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email harus berupa string!" })
    .email({ message: "Mohon masukkan email yang valid!" }),
  password: z.string({ message: "Password harus berupa string!" }).min(8, 'Password must be at least 8 characters'),
});