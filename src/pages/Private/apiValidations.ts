import { z } from "zod";

export const notificationSchema = z.object({
  message: z.string(),
  timestamp: z.string(),
  read: z.boolean(),
});

export const notificationsResponseSchema = z.object({
  notifications: z.array(notificationSchema),
  total: z.number(),
  unread_count: z.number(),
});
