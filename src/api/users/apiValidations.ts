import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  role: z.string(),
  managerId: z.number().optional(),
  isActive: z.boolean(),
});

export const usersResponseSchema = z.array(userSchema);
