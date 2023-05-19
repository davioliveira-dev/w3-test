"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTasksAdapter = exports.updateTasksAdapter = exports.createTasksAdapter = void 0;
const createTasksAdapter = (data) => {
    if (!data)
        throw new Error("Data is required");
    if (!data.title)
        throw new Error("Title is required");
    return data;
};
exports.createTasksAdapter = createTasksAdapter;
const updateTasksAdapter = (data) => {
    if (!data)
        throw new Error("Data is required");
    if (!data.id)
        throw new Error("Id is required");
    return data;
};
exports.updateTasksAdapter = updateTasksAdapter;
const deleteTasksAdapter = (data) => {
    if (!data)
        throw new Error("Data is required");
    if (!data.id)
        throw new Error("Id is required");
    return data;
};
exports.deleteTasksAdapter = deleteTasksAdapter;
