import { api } from "@api/api";

import { getPersonalTasks } from "./tasksEndpoints";
import { GetPersonalTasksResBody } from "./types";

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalTasks: builder.query<GetPersonalTasksResBody, void>({
      query: getPersonalTasks,
    }),
    // getPersonalTasks: builder.query<GetPersonalTasksResBody, void>({
    //   query: getPersonalTasks,
    //   transformResponse: (response: { data: GetPersonalTasksResBody }) => {
    //     return response.data;
    //   },
    // }),
  }),
  overrideExisting: false,
});

export const { useGetPersonalTasksQuery } = tasksApi;
