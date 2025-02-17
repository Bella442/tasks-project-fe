import { z } from "zod";

import { userSchema } from "@api/users/apiValidations";

export const chatSchema = z.object({
  id: z.number(),
  roomId: z.string(),
  initiatorId: z.string(),
  participantId: z.string(),
  initiatorUser: userSchema,
  participantUser: userSchema,
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
