import { z } from "zod";

import { userSchema } from "@api/users/apiValidations";

export const chatSchema = z.object({
  id: z.number(),
  roomId: z.string(),
  initiatorId: z.number(),
  participantId: z.number(),
  initiatorUser: userSchema,
  participantUser: userSchema,
});

export const chatRequestSchema = z.object({
  roomId: z.string(),
  initiatorId: z.number(),
  participantId: z.number(),
});

export const chatResponseSchema = z.array(chatSchema);
