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
(0, node_test_1.describe)("Negative cases for CreateTaskUseCase", () => {
    let repositoryMock = {
        findAll: node_test_1.mock.fn(),
        findById: node_test_1.mock.fn(),
        findByTitle: node_test_1.mock.fn(),
        create: node_test_1.mock.fn(),
        update: node_test_1.mock.fn(),
        delete: node_test_1.mock.fn(),
    };
    (0, node_test_1.it)("should throw an error if the task title is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const createTaskUseCase = new index_1.CreateTaskUseCase(repositoryMock);
        const result = yield createTaskUseCase
            .execute({ title: "" })
            .catch((e) => e);
        node_assert_1.default.strictEqual(result.message, "Title is required");
    }));
    (0, node_test_1.it)("should throw an error if the task title is not a string", () => __awaiter(void 0, void 0, void 0, function* () {
        const createTaskUseCase = new index_1.CreateTaskUseCase(repositoryMock);
        const result = yield createTaskUseCase
            // @ts-expect-error - we are testing negative cases
            .execute({ title: 123 })
            .catch((e) => e);
        node_assert_1.default.strictEqual(result.message, "Title must be a string");
    }));
    (0, node_test_1.it)("should throw an error if the task title is longer than 255 characters", () => __awaiter(void 0, void 0, void 0, function* () {
        const createTaskUseCase = new index_1.CreateTaskUseCase(repositoryMock);
        const result = yield createTaskUseCase
            .execute({ title: "a".repeat(256) })
            .catch((e) => e);
        node_assert_1.default.strictEqual(result.message, "Title must be less than 255 characters");
    }));
    (0, node_test_1.it)("should throw an error if the task title is shorter than 3 characters", () => __awaiter(void 0, void 0, void 0, function* () {
        const createTaskUseCase = new index_1.CreateTaskUseCase(repositoryMock);
        const result = yield createTaskUseCase
            .execute({ title: "a" })
            .catch((e) => e);
        node_assert_1.default.strictEqual(result.message, "Title must be at least 3 characters");
    }));
    (0, node_test_1.it)("should throw an error if the task with same title already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const createTaskUseCase = new index_1.CreateTaskUseCase(repositoryMock);
        repositoryMock.findByTitle = node_test_1.mock.fn(() => Promise.resolve({
            id: 1,
            title: "Task 1",
            isDone: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        const result = yield createTaskUseCase
            .execute({ title: "Task 1" })
            .catch((e) => e);
        node_assert_1.default.strictEqual(result.message, "Task with same title already exists");
    }));
    (0, node_test_1.it)("should throw an error if the task isDone is not a boolean", () => __awaiter(void 0, void 0, void 0, function* () {
        const createTaskUseCase = new index_1.CreateTaskUseCase(repositoryMock);
        const result = yield createTaskUseCase
            .execute({
            title: "Task 1",
            // @ts-expect-error - we are testing negative cases
            isDone: "true",
        })
            .catch((e) => e);
        node_assert_1.default.strictEqual(result.message, "isDone must be a boolean");
    }));
});
(0, node_test_1.describe)("Positive cases for CreateTaskUseCase", () => {
    let repositoryMock = {
        findAll: node_test_1.mock.fn(),
        findById: node_test_1.mock.fn(),
        findByTitle: node_test_1.mock.fn(),
        create: node_test_1.mock.fn(),
        update: node_test_1.mock.fn(),
        delete: node_test_1.mock.fn(),
    };
    (0, node_test_1.it)("should create a task", () => __awaiter(void 0, void 0, void 0, function* () {
        const createTaskUseCase = new index_1.CreateTaskUseCase(repositoryMock);
        repositoryMock.findByTitle = node_test_1.mock.fn(() => Promise.resolve(null));
        repositoryMock.create = node_test_1.mock.fn(() => Promise.resolve({
            id: 1,
            title: "Task 1",
            isDone: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        const result = yield createTaskUseCase.execute({ title: "Task 1" });
        node_assert_1.default.strictEqual(result.title, "Task 1");
    }));
    (0, node_test_1.it)("should create a task with isDone true", () => __awaiter(void 0, void 0, void 0, function* () {
        const createTaskUseCase = new index_1.CreateTaskUseCase(repositoryMock);
        repositoryMock.findByTitle = node_test_1.mock.fn(() => Promise.resolve(null));
        repositoryMock.create = node_test_1.mock.fn(() => Promise.resolve({
            id: 1,
            title: "Task 1",
            isDone: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        const result = yield createTaskUseCase.execute({
            title: "Task 1",
            isDone: true,
        });
        node_assert_1.default.strictEqual(result.title, "Task 1");
        node_assert_1.default.strictEqual(result.isDone, true);
    }));
});
