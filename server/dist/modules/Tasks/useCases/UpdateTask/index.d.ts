import { UpdateTaskDto } from "modules/Tasks/dto/Tasks.dto";
import { TasksRepository } from "modules/Tasks/repository/Tasks.repository";
export declare class UpdateTaskUseCase {
    private readonly tasksRepository;
    constructor(tasksRepository: TasksRepository);
    execute(params: UpdateTaskDto): Promise<import("modules/Tasks/dto/Tasks.dto").TasksDto>;
}
