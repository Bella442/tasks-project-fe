import { z } from "zod";

import { chatUserSchema } from "@api/users/apiValidations";

export const chatSchema = z.object({
  id: z.number(),
  roomId: z.string(),
  initiatorId: z.string(),
  participantId: z.string(),
  initiatorUser: chatUserSchema,
  participantUser: chatUserSchema,
});

export const chatRequestSchema = z.object({
  roomId: z.string(),
  initiatorId: z.string(),
  participantId: z.string(),
});

export const chatResponseSchema = z.array(chatSchema);

export const messageSchema = z.object({
  id: z.number().optional(),
  sentBy: z.string(),
  userName: z.string(),
  text: z.string(),
  createdAt: z.string(),
});

export const chatHistoryRequestSchema = z.object({
  roomId: z.string(),
});

export const chatHistoryResponseSchema = z.array(messageSchema);

export const updateReadMessagesRequestSchema = z.object({
  roomId: z.string(),
});

export const updateReadMessagesResponseSchema = z.void();

export const unreadMessagesResponseSchema = z.array(
  z.object({ roomId: z.string(), unreadMessagesCount: z.number() }),
);
