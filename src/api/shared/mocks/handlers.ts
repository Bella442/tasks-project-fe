import { http, HttpResponse } from "msw";

import { makeUrl } from "@utils/utils";

import { getUniversityDataByCountryResponse } from "./mockedResponses";
import { EndpointURLs } from "../endpoints";

export const sharedHandlers = [
  http.get(
    makeUrl(
      EndpointURLs.GET_UNIVERSITY_BY_COUNTRY,
      import.meta.env.VITE_UNIVERSITIES_API,
    ),
    ({ request }) => {
      const url = new URL(request.url);
      const country = url.searchParams.get("country");

      if (country && country === "Bulgaria") {
        return HttpResponse.json(getUniversityDataByCountryResponse, {
          status: 200,
        });
      } else {
        return HttpResponse.json([], {
          status: 200,
        });
      }
    },
  ),
];
