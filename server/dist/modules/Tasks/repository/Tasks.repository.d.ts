import { BasePageableResult } from "../../../shared/types";
import { CreateTaskDto, TasksDto, UpdateTaskDto } from "../dto/Tasks.dto";
export interface TasksRepository {
    findAll(): Promise<BasePageableResult<TasksDto>>;
    findById(id: TasksDto["id"]): Promise<TasksDto | undefined>;
    findByTitle(title: TasksDto["title"]): Promise<TasksDto | undefined>;
    create(params: CreateTaskDto): Promise<TasksDto>;
    update(params: UpdateTaskDto): Promise<TasksDto>;
    delete(id: TasksDto["id"]): Promise<void>;
}
