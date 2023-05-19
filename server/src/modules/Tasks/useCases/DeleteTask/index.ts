import { TasksRepository } from "@/modules/Tasks/repository/Tasks.repository";

export class DeleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(id: number) {
    if (!id) throw new Error("Missing task id");

    const taskExists = await this.tasksRepository.findById(id);

    if (!taskExists) throw new Error("Task not found");

    await this.tasksRepository.delete(id);
  }
}
