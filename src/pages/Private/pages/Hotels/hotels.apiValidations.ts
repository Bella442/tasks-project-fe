import { z } from "zod";

export const hotelsSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Destination: z.string(),
  HotelId: z.string(),
  Image: z.string(),
  MapUrl: z.string(),
  Address: z.string(),
  Description: z.string(),
});

export const hotelsResponseSchema = z.array(hotelsSchema);
