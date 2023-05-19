import { ListTasksDto } from "@/modules/Tasks/dto/Tasks.dto";
import { TasksRepository } from "@/modules/Tasks/repository/Tasks.repository";

export class ListTasksUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute(params: ListTasksDto) {
    const tasks = await this.tasksRepository.findAll(params);
    return tasks;
  }
}
