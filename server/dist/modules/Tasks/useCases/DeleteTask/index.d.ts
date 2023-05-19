import { TasksRepository } from "@/modules/Tasks/repository/Tasks.repository";
export declare class DeleteTaskUseCase {
    private tasksRepository;
    constructor(tasksRepository: TasksRepository);
    execute(id: number): Promise<void>;
}
