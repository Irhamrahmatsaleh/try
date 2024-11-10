import { z } from "zod";

export const passwordSchema = z.object({
  email: z
    .string({ message: "Email harus berupa string!" })
    .email({ message: "Mohon masukkan email yang valid!" }),
});