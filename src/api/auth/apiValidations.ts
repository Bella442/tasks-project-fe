import { z } from "zod";

import { userSchema } from "@api/users/apiValidations";

export const loginRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const refreshRequestSchema = z.object({
  refreshToken: z.string(),
});

export const refreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
