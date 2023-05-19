import { Router } from "express";
import TasksController from "./Tasks.controller";

const router = Router();

router.get("/", TasksController.index);
router.get("/:id", TasksController.show);
router.post("/", TasksController.create);
router.put("/:id", TasksController.update);
router.delete("/:id", TasksController.delete);

export { router as tasksRouter };
