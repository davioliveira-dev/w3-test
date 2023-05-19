"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocalTasksRepository {
    constructor() {
        this.tasks = [];
    }
    findAll() {
        throw new Error("Method not implemented.");
    }
    findById(id) {
        return Promise.resolve(this.tasks.find((task) => task.id === id));
    }
    findByTitle(title) {
        return Promise.resolve(this.tasks.find((task) => task.title === title));
    }
    create(params) {
        var _a;
        const task = {
            id: this.tasks.length + 1,
            title: params.title,
            isDone: (_a = params.isDone) !== null && _a !== void 0 ? _a : false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.tasks.push(task);
        return Promise.resolve(task);
    }
    update(params) {
        var _a, _b;
        const task = this.tasks.find((task) => task.id === params.id);
        if (!task)
            throw new Error("Task not found");
        const updatedTask = Object.assign(Object.assign({}, task), { title: (_a = params.title) !== null && _a !== void 0 ? _a : task.title, isDone: (_b = params.isDone) !== null && _b !== void 0 ? _b : task.isDone, updatedAt: new Date() });
        const index = this.tasks.findIndex((task) => task.id === params.id);
        this.tasks[index] = updatedTask;
        return Promise.resolve(updatedTask);
    }
    delete(id) {
        const index = this.tasks.findIndex((task) => task.id === id);
        this.tasks.splice(index, 1);
        return Promise.resolve();
    }
}
exports.default = new LocalTasksRepository();
