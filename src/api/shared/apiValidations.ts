import { z } from "zod";

export const universitySchema = z.object({
  "state-province": z.string(),
  country: z.string(),
  alpha_two_code: z.string(),
  domains: z.array(z.string()),
  web_pages: z.array(z.string()),
  name: z.string(),
});

export const universitiesResponseSchema = z.array(universitySchema);

export const universitiesRequestSchema = z.object({
  country: z.string(),
});

export const countrySchema = z.object({
  name: z.string(),
  flag: z.string(),
});

export const countriesResponseSchema = z.array(countrySchema);
