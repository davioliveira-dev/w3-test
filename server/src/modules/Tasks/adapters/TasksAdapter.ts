import { BasePageableParams } from "@/shared/types";
import {
  CreateTaskDto,
  DeleteTaskDto,
  ListTasksDto,
  ShowTaskDto,
  UpdateTaskDto,
} from "../dto/Tasks.dto";

export const createTasksAdapter = (data: any): CreateTaskDto => {
  if (!data) throw new Error("Data is required");
  if (!data.title) throw new Error("Title is required");
  return data;
};

export const updateTasksAdapter = (data: any): UpdateTaskDto => {
  if (!data) throw new Error("Data is required");
  if (!data.id) throw new Error("Id is required");
  return data;
};

export const deleteTasksAdapter = (data: any): DeleteTaskDto => {
  if (!data) throw new Error("Data is required");
  if (!data.id) throw new Error("Id is required");
  return data;
};

export const listTasksAdapter = (data: any): ListTasksDto => {
  if (Number.isNaN(Number(data.page))) throw new Error("Page is invalid");
  if (Number.isNaN(Number(data.limit))) throw new Error("Limit is invalid");
  data.page = Number(data.page);
  data.limit = Number(data.limit);
  return data;
};

export const showTaskAdapter = (data: any): ShowTaskDto => {
  if (!data) throw new Error("Data is required");
  if (!data.id) throw new Error("Id is required");
  return data;
};
