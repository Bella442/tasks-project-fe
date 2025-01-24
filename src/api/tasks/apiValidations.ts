import { z } from "zod";

import { userSchema } from "@api/users/apiValidations";

export const tasksSchema = z.object({
  id: z.number(),
  userId: z.number(),
  taskName: z.string(),
  startDate: z.date(),
  endDate: z.date().optional(),
  taskStatus: z.string(),
  user: userSchema.optional(),
});

export const tasksResponseSchema = z.array(tasksSchema);
