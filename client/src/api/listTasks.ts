import { env } from "../config/env";
import { Task } from "../types";

export type ListTasksParams = {
  page: number;
  limit: number;
};

export type ListTasksResponse = {
  results: Task[];
  total: number;
  page: number;
  limit: number;
};

export const listTasks = async (params: ListTasksParams) => {
  const url = new URL(env.API_URL + "/tasks");
  url.searchParams.append("page", params.page.toString());
  url.searchParams.append("limit", params.limit.toString());

  return fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json() as Promise<ListTasksResponse>);
};
