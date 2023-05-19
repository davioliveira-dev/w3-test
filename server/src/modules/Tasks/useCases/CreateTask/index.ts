import { CreateTaskDto } from "../../dto/Tasks.dto";
import { TasksRepository } from "../../repository/Tasks.repository";

export class CreateTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute(params: CreateTaskDto) {
    if (!params.title) {
      throw new Error("Title is required");
    }

    if (typeof params.title !== "string") {
      throw new Error("Title must be a string");
    }

    if (params.title.length < 3) {
      throw new Error("Title must be at least 3 characters");
    }

    if (params.title.length > 255) {
      throw new Error("Title must be less than 255 characters");
    }

    if (params.isDone !== undefined && typeof params.isDone !== "boolean") {
      throw new Error("isDone must be a boolean");
    }

    const taskAlreadyExists = await this.tasksRepository.findByTitle(
      params.title
    );

    if (taskAlreadyExists) {
      throw new Error("Task with same title already exists");
    }

    const task = await this.tasksRepository.create(params);

    return task;
  }
}
