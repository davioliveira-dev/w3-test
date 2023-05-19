import { Request, Response } from "express";
import {
  createTasksAdapter,
  deleteTasksAdapter,
  listTasksAdapter,
  showTaskAdapter,
  updateTasksAdapter,
} from "./adapters/TasksAdapter";
import {
  createTaskUseCase,
  deleteTaskUseCase,
  listTasksUseCase,
  showTaskUseCase,
  updateTaskUseCase,
} from "./useCases";

class TasksController {
  async create(req: Request, res: Response) {
    const params = createTasksAdapter(req.body);
    const task = await createTaskUseCase.execute(params);
    return res.status(201).json(task);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params = updateTasksAdapter({
      ...req.body,
      id: Number(id),
    });
    const task = await updateTaskUseCase.execute(params);
    return res.status(201).json(task);
  }

  async delete(req: Request, res: Response) {
    const params = deleteTasksAdapter(req.params);
    await deleteTaskUseCase.execute(Number(params.id));
    return res.sendStatus(201);
  }

  async index(req: Request, res: Response) {
    const params = listTasksAdapter(req.query);
    const tasks = await listTasksUseCase.execute(params);
    return res.status(200).json(tasks);
  }

  async show(req: Request, res: Response) {
    const params = showTaskAdapter(req.params);
    const task = await showTaskUseCase.execute(params);
    return res.status(200).json(task);
  }
}

export default new TasksController();
