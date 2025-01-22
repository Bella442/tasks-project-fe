import { z } from "zod";

export const chartSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.number(),
});

export const chartResponseSchema = z.array(chartSchema);
