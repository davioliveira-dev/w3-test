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
const node_assert_1 = __importDefault(require("node:assert"));
const app_1 = require("@/infra/app");
const env_1 = require("@/infra/env");
const makeRequest_1 = require("@/shared/utils/makeRequest");
(0, node_test_1.describe)("Integration tests for CreateTaskUseCase", () => {
    const baseUrl = env_1.ApiEnv.BASE_URL + "/tasks";
    let _server;
    (0, node_test_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
        _server = app_1.app.listen(3333);
        yield new Promise((resolve) => _server.once("listening", resolve));
    }));
    (0, node_test_1.it)("should create a new task", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, makeRequest_1.makeRequest)(baseUrl, {
            method: "POST",
            body: { title: "Test task" },
        });
        const data = yield response.json();
        node_assert_1.default.strictEqual(response.status, 201);
        node_assert_1.default.strictEqual(data.title, "Test task");
        node_assert_1.default.strictEqual(data.isDone, false);
    }));
    (0, node_test_1.it)("should create a new task with isDone true", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, makeRequest_1.makeRequest)(baseUrl, {
            method: "POST",
            body: { title: "Test task 2", isDone: true },
        });
        const data = yield response.json();
        node_assert_1.default.strictEqual(response.status, 201);
        node_assert_1.default.strictEqual(data.title, "Test task 2");
        node_assert_1.default.strictEqual(data.isDone, true);
    }));
    (0, node_test_1.after)((done) => {
        _server.close(done);
    });
});
