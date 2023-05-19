import { ApiEnv } from "@/infra/env";
import { BasePageableResult } from "../../../../shared/types";
import {
  TasksDto,
  CreateTaskDto,
  UpdateTaskDto,
  ListTasksDto,
} from "../../dto/Tasks.dto";
import { TasksRepository } from "../Tasks.repository";

class LocalTasksRepository implements TasksRepository {
  private tasks: TasksDto[] = ApiEnv.USE_MOCKS
    ? Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        title: `Task ${index + 1}`,
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    : [];

  findAll(params: ListTasksDto): Promise<BasePageableResult<TasksDto>> {
    const { page, limit } = params;
    const offset = (page - 1) * limit;
    const tasks = this.tasks.slice(offset, offset + limit);
    return Promise.resolve({
      results: tasks,
      total: this.tasks.length,
      page,
      limit,
    });
  }

  findById(id: number): Promise<TasksDto | undefined> {
    return Promise.resolve(this.tasks.find((task) => task.id === id));
  }

  findByTitle(title: string): Promise<TasksDto | undefined> {
    return Promise.resolve(this.tasks.find((task) => task.title === title));
  }

  create(params: CreateTaskDto): Promise<TasksDto> {
    const task = {
      id: this.tasks.length + 1,
      title: params.title,
      isDone: params.isDone ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.push(task);
    return Promise.resolve(task);
  }

  update(params: UpdateTaskDto): Promise<TasksDto> {
    const task = this.tasks.find((task) => task.id === params.id);

    if (!task) throw new Error("Task not found");

    const updatedTask = {
      ...task,
      title: params.title ?? task.title,
      isDone: params.isDone ?? task.isDone,
      updatedAt: new Date(),
    };

    const index = this.tasks.findIndex((task) => task.id === params.id);
    this.tasks[index] = updatedTask;

    return Promise.resolve(updatedTask);
  }

  delete(id: number): Promise<void> {
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(index, 1);

    return Promise.resolve();
  }
}

export default new LocalTasksRepository();
