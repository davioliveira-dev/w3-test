import { BasePageableResult } from "../../../shared/types";
import {
  CreateTaskDto,
  ListTasksDto,
  TasksDto,
  UpdateTaskDto,
} from "../dto/Tasks.dto";

export interface TasksRepository {
  findAll(params: ListTasksDto): Promise<BasePageableResult<TasksDto>>;
  findById(id: TasksDto["id"]): Promise<TasksDto | undefined>;
  findByTitle(title: TasksDto["title"]): Promise<TasksDto | undefined>;
  create(params: CreateTaskDto): Promise<TasksDto>;
  update(params: UpdateTaskDto): Promise<TasksDto>;
  delete(id: TasksDto["id"]): Promise<void>;
}
