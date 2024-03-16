import { z } from "zod";

export const AuthenticateSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Message must be at least 6 characters." }),
});
