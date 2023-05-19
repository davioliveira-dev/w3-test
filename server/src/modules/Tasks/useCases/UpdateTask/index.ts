import { UpdateTaskDto } from "modules/Tasks/dto/Tasks.dto";
import { TasksRepository } from "modules/Tasks/repository/Tasks.repository";

export class UpdateTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute(params: UpdateTaskDto) {
    const task = await this.tasksRepository.findById(params.id);

    if (!task) {
      throw new Error("Task not found");
    }

    if (params.title) {
      if (typeof params.title !== "string") {
        throw new Error("Title must be a string");
      }

      if (params.title.length < 3) {
        throw new Error("Title must be at least 3 characters");
      }

      if (params.title.length > 255) {
        throw new Error("Title must be less than 255 characters");
      }

      const taskWithSameTitle = await this.tasksRepository.findByTitle(
        params.title
      );

      if (taskWithSameTitle) {
        throw new Error("Task with same title already exists");
      }
    }

    if (params.isDone !== undefined && typeof params.isDone !== "boolean") {
      throw new Error("isDone must be a boolean");
    }

    const updatedTask = await this.tasksRepository.update(params);

    return updatedTask;
  }
}
