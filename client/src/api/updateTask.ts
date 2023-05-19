import { env } from "../config/env";
import { Task } from "../types";

export const updateTask = async (task: Partial<Task>) => {
  const url = new URL(`${env.API_URL}/tasks/${task.id}`);

  return fetch(url.toString(), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...task }),
  }).then((response) => response.json() as Promise<Task>);
};
