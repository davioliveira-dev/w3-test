import { BasePageableResult } from "../../../../shared/types";
import { TasksDto, CreateTaskDto, UpdateTaskDto } from "../../dto/Tasks.dto";
import { TasksRepository } from "../Tasks.repository";
declare class LocalTasksRepository implements TasksRepository {
    private tasks;
    findAll(): Promise<BasePageableResult<TasksDto>>;
    findById(id: number): Promise<TasksDto | undefined>;
    findByTitle(title: string): Promise<TasksDto | undefined>;
    create(params: CreateTaskDto): Promise<TasksDto>;
    update(params: UpdateTaskDto): Promise<TasksDto>;
    delete(id: number): Promise<void>;
}
declare const _default: LocalTasksRepository;
export default _default;
