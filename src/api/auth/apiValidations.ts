import { z } from "zod";

import { userSchema } from "@api/users/apiValidations";

export const loginRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
});
