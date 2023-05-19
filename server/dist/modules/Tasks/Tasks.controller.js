"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TasksAdapter_1 = require("./adapters/TasksAdapter");
const useCases_1 = require("./useCases");
class TasksController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = (0, TasksAdapter_1.createTasksAdapter)(req.body);
            const task = yield useCases_1.createTaskUseCase.execute(params);
            return res.status(201).json(task);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const params = (0, TasksAdapter_1.updateTasksAdapter)(Object.assign(Object.assign({}, req.body), { id: Number(id) }));
            const task = yield useCases_1.updateTaskUseCase.execute(params);
            return res.status(201).json(task);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = (0, TasksAdapter_1.deleteTasksAdapter)(req.params);
            yield useCases_1.deleteTaskUseCase.execute(Number(params.id));
            return res.status(201);
        });
    }
}
exports.default = new TasksController();
