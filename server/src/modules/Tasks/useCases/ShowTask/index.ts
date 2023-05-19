import { ShowTaskDto } from "@/modules/Tasks/dto/Tasks.dto";
import { TasksRepository } from "@/modules/Tasks/repository/Tasks.repository";

export class ShowTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute(params: ShowTaskDto) {
    if (!params) throw new Error("Params is required");

    if (!params.id) throw new Error("Missing task id");

    const task = await this.tasksRepository.findById(params.id);

    console.log("resul 111t", task);

    if (!task) throw new Error("Task not found");

    return task;
  }
}
