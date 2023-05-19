import { env } from "../config/env";
import { Task } from "../types";

export const createTask = async (title: string) => {
  const url = new URL(env.API_URL + "/tasks");

  return fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  }).then((response) => response.json() as Promise<Task>);
};
