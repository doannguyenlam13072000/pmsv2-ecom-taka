import { z } from "zod";

export const testBodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(1, "Age is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});
