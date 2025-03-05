import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  role: z.string(),
  managerId: z.string().optional(),
  isActive: z.boolean(),
});

export const chatUserSchema = z.object({
  email: z.string().optional(),
  firstName: z.string(),
  id: z.string(),
  lastName: z.string().optional(),
});

export const usersResponseSchema = z.array(userSchema);

export const chatUserResponseSchema = z.array(chatUserSchema);
