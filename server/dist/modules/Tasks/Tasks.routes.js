"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const express_1 = require("express");
const Tasks_controller_1 = __importDefault(require("./Tasks.controller"));
const router = (0, express_1.Router)();
exports.tasksRouter = router;
router.post("/", Tasks_controller_1.default.create);
router.put("/:id", Tasks_controller_1.default.update);
router.delete("/:id", Tasks_controller_1.default.delete);
