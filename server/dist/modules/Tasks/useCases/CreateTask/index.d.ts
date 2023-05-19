import { CreateTaskDto } from "../../dto/Tasks.dto";
import { TasksRepository } from "../../repository/Tasks.repository";
export declare class CreateTaskUseCase {
    private readonly tasksRepository;
    constructor(tasksRepository: TasksRepository);
    execute(params: CreateTaskDto): Promise<import("../../dto/Tasks.dto").TasksDto>;
}
