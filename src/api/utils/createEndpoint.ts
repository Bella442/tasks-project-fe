import { z } from "zod";

import { HttpMethods } from "@constants/constants";

type QueryFn<
  RequestSchema extends z.ZodTypeAny | undefined | never,
  ResponseSchema extends z.ZodTypeAny,
  Method extends HttpMethods,
  InferredRequestSchema = RequestSchema extends z.ZodTypeAny
    ? z.infer<RequestSchema>
    : never,
> = (...args: [InferredRequestSchema]) => Method extends HttpMethods.GET
  ? {
      url: string;
      params?: Record<string, InferredRequestSchema>; // rtk asks for Record type
      responseSchema: ResponseSchema;
      requestSchema: RequestSchema;
      extraParams?: {
        isExternalUrl?: boolean;
        externalApiUrl?: string;
      };
    }
  : {
      url: string;
      body: InferredRequestSchema;
      responseSchema: ResponseSchema;
      requestSchema: RequestSchema;
      extraParams?: {
        isExternalUrl?: boolean;
        externalApiUrl?: string;
      };
    };

type CreateEndpointProps<
  ResponseSchema extends z.ZodTypeAny,
  RequestSchema extends z.ZodTypeAny | undefined,
  InferredReqSchema = RequestSchema extends z.ZodTypeAny
    ? z.infer<RequestSchema>
    : never,
  URLGeneric = string | Function,
> =
  | {
      url?: never;
      method: HttpMethods;
      responseSchema: ResponseSchema;
      requestSchema?: RequestSchema;
      fn?: (args: InferredReqSchema) => {
        url: string;
        params?: Partial<InferredReqSchema>;
        body?: Partial<InferredReqSchema>;
        extraParams?: {
          isExternalUrl?: boolean;
          externalApiUrl?: string;
        };
      };
    }
  | {
      url: URLGeneric extends string
        ? URLGeneric
        : (...args: [InferredReqSchema]) => string;
      method: HttpMethods;
      responseSchema: ResponseSchema;
      requestSchema?: RequestSchema;
      fn?: (args: InferredReqSchema) => {
        url?: never;
        params?: Partial<InferredReqSchema>;
        body?: Partial<InferredReqSchema>;
        extraParams?: {
          isExternalUrl?: boolean;
          externalApiUrl?: string;
        };
      };
    };

const createEndpoint = <
  ResponseSchema extends z.ZodTypeAny,
  RequestSchema extends z.ZodTypeAny | undefined,
>(
  endpoint: CreateEndpointProps<ResponseSchema, RequestSchema>,
): QueryFn<
  RequestSchema,
  ResponseSchema,
  CreateEndpointProps<ResponseSchema, RequestSchema>["method"]
> => {
  const { url = "", requestSchema, responseSchema } = endpoint;

  return (args) => {
    let returnObj = {
      url: typeof url === "function" ? url(args) : url || "",
      method: endpoint.method,
      params: undefined,
      body: undefined,
      responseSchema: responseSchema as ResponseSchema,
      requestSchema: requestSchema as RequestSchema,
      extraParams: {},
    };

    if (endpoint.method === HttpMethods.GET) {
      returnObj.params = args;
    } else {
      returnObj.body = args;
    }

    // can overwrite the return obj
    if (endpoint?.fn) {
      const endpointFn = endpoint.fn(args);

      returnObj = {
        ...returnObj,
        ...(endpoint.fn(args) as typeof returnObj),
      };

      if (endpointFn?.url) {
        returnObj.url = endpointFn.url.startsWith("/")
          ? endpointFn.url
          : `/${endpointFn.url}`;
      }
    }

    return returnObj;
  };
};

export default createEndpoint;
