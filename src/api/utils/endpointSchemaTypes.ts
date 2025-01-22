import { z } from "zod";

export type EndpointType = (args: never) => {
  url: string;
  body?: unknown;
  responseSchema: z.ZodTypeAny;
  requestSchema?: z.ZodTypeAny;
};

export type GetEndpointSchemaType<T extends EndpointType> =
  ReturnType<T>["requestSchema"] extends z.ZodTypeAny
    ? {
        responseSchema: z.infer<ReturnType<T>["responseSchema"]>;
        requestSchema: ReturnType<T>["requestSchema"] extends z.ZodTypeAny
          ? z.infer<ReturnType<T>["requestSchema"]>
          : never;
      }
    : {
        responseSchema: z.infer<ReturnType<T>["responseSchema"]>;
      };
