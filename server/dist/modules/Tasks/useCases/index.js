"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskUseCase = exports.updateTaskUseCase = exports.createTaskUseCase = void 0;
const LocalTasksRepository_1 = __importDefault(require("../repository/local/LocalTasksRepository"));
const CreateTask_1 = require("./CreateTask");
const UpdateTask_1 = require("./UpdateTask");
const DeleteTask_1 = require("./DeleteTask");
const createTaskUseCase = new CreateTask_1.CreateTaskUseCase(LocalTasksRepository_1.default);
exports.createTaskUseCase = createTaskUseCase;
const updateTaskUseCase = new UpdateTask_1.UpdateTaskUseCase(LocalTasksRepository_1.default);
exports.updateTaskUseCase = updateTaskUseCase;
const deleteTaskUseCase = new DeleteTask_1.DeleteTaskUseCase(LocalTasksRepository_1.default);
exports.deleteTaskUseCase = deleteTaskUseCase;
