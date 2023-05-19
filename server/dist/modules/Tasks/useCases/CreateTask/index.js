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
exports.CreateTaskUseCase = void 0;
class CreateTaskUseCase {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    execute(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.title) {
                throw new Error("Title is required");
            }
            if (typeof params.title !== "string") {
                throw new Error("Title must be a string");
            }
            if (params.title.length < 3) {
                throw new Error("Title must be at least 3 characters");
            }
            if (params.title.length > 255) {
                throw new Error("Title must be less than 255 characters");
            }
            if (params.isDone !== undefined && typeof params.isDone !== "boolean") {
                throw new Error("isDone must be a boolean");
            }
            const taskAlreadyExists = yield this.tasksRepository.findByTitle(params.title);
            if (taskAlreadyExists) {
                throw new Error("Task with same title already exists");
            }
            const task = yield this.tasksRepository.create(params);
            return task;
        });
    }
}
exports.CreateTaskUseCase = CreateTaskUseCase;
