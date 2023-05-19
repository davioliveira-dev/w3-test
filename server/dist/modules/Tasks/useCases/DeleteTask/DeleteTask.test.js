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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const index_1 = require("./index");
const node_assert_1 = __importDefault(require("node:assert"));
(0, node_test_1.describe)("Negative cases for DeleteTaskUseCase", () => {
    let repositoryMock = {
        findAll: node_test_1.mock.fn(),
        findById: node_test_1.mock.fn(),
        findByTitle: node_test_1.mock.fn(),
        create: node_test_1.mock.fn(),
        update: node_test_1.mock.fn(),
        delete: node_test_1.mock.fn(),
    };
    (0, node_test_1.it)("should throw an error if the id is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteTaskUseCase = new index_1.DeleteTaskUseCase(repositoryMock);
        const result = yield deleteTaskUseCase.execute(undefined).catch((e) => e);
        node_assert_1.default.strictEqual(result.message, "Missing task id");
    }));
    (0, node_test_1.it)("should throw an error if the task does not exists", () => __awaiter(void 0, void 0, void 0, function* () {
        repositoryMock.findById = node_test_1.mock.fn(() => Promise.resolve(undefined));
        const deleteTaskUseCase = new index_1.DeleteTaskUseCase(repositoryMock);
        const result = yield deleteTaskUseCase.execute(1).catch((e) => e);
        node_assert_1.default.strictEqual(result.message, "Task not found");
    }));
});
(0, node_test_1.describe)("Positive cases for DeleteTaskUseCase", () => {
    let repositoryMock = {
        findAll: node_test_1.mock.fn(),
        findById: node_test_1.mock.fn(),
        findByTitle: node_test_1.mock.fn(),
        create: node_test_1.mock.fn(),
        update: node_test_1.mock.fn(),
        delete: node_test_1.mock.fn(),
    };
    (0, node_test_1.it)("should delete a task", () => __awaiter(void 0, void 0, void 0, function* () {
        repositoryMock.findById = node_test_1.mock.fn(() => Promise.resolve({
            id: 1,
            title: "Task 1",
            isDone: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        repositoryMock.delete = node_test_1.mock.fn(() => Promise.resolve());
        const deleteTaskUseCase = new index_1.DeleteTaskUseCase(repositoryMock);
        const result = yield deleteTaskUseCase.execute(1);
        node_assert_1.default.strictEqual(result, undefined);
    }));
});
