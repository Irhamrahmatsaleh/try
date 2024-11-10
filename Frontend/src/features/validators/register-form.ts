import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({ message: "Email harus berupa string!" })
    .email({ message: "Mohon masukkan email yang valid!" }),
    full_name: z.string({message: "Nama harus berupa string!"}),
  password: z.string({ message: "Password harus berupa string!" }).min(8, 'Password must be at least 8 characters'),
});