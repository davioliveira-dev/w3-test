import LocalTasksRepository from "../repository/local/LocalTasksRepository";
import { CreateTaskUseCase } from "./CreateTask";
import { UpdateTaskUseCase } from "./UpdateTask";
import { DeleteTaskUseCase } from "./DeleteTask";
import { ListTasksUseCase } from "./ListTasks";
import { ShowTaskUseCase } from "./ShowTask";

const createTaskUseCase = new CreateTaskUseCase(LocalTasksRepository);
const updateTaskUseCase = new UpdateTaskUseCase(LocalTasksRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(LocalTasksRepository);
const listTasksUseCase = new ListTasksUseCase(LocalTasksRepository);
const showTaskUseCase = new ShowTaskUseCase(LocalTasksRepository);

export {
  createTaskUseCase,
  updateTaskUseCase,
  deleteTaskUseCase,
  listTasksUseCase,
  showTaskUseCase,
};
