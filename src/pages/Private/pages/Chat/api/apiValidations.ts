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
