"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const errorToExpressResponse_1 = require("../../shared/errors/errorToExpressResponse");
const Tasks_routes_1 = require("../../modules/Tasks/Tasks.routes");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/tasks", Tasks_routes_1.tasksRouter);
app.use(errorToExpressResponse_1.errorToExpressResponse);
