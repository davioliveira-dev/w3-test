import { env } from "../config/env";
import { Task } from "../types";

export const deleteTask = async (task: Task) => {
  const url = new URL(`${env.API_URL}/tasks/${task.id}`);

  return fetch(url.toString(), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
