import { describe, it, mock } from "node:test";
import { CreateTaskUseCase } from "./index";
import { TasksRepository } from "../../repository/Tasks.repository";
import assert from "node:assert";

describe("Negative cases for CreateTaskUseCase", () => {
  let repositoryMock: TasksRepository = {
    findAll: mock.fn(),
    findById: mock.fn(),
    findByTitle: mock.fn(),
    create: mock.fn(),
    update: mock.fn(),
    delete: mock.fn(),
  };

  it("should throw an error if the task title is empty", async () => {
    const createTaskUseCase = new CreateTaskUseCase(repositoryMock);
    const result = await createTaskUseCase
      .execute({ title: "" })
      .catch((e) => e);
    assert.strictEqual(result.message, "Title is required");
  });

  it("should throw an error if the task title is not a string", async () => {
    const createTaskUseCase = new CreateTaskUseCase(repositoryMock);
    const result = await createTaskUseCase
      // @ts-expect-error - we are testing negative cases
      .execute({ title: 123 })
      .catch((e) => e);

    assert.strictEqual(result.message, "Title must be a string");
  });

  it("should throw an error if the task title is longer than 255 characters", async () => {
    const createTaskUseCase = new CreateTaskUseCase(repositoryMock);
    const result = await createTaskUseCase
      .execute({ title: "a".repeat(256) })
      .catch((e) => e);

    assert.strictEqual(
      result.message,
      "Title must be less than 255 characters"
    );
  });

  it("should throw an error if the task title is shorter than 3 characters", async () => {
    const createTaskUseCase = new CreateTaskUseCase(repositoryMock);
    const result = await createTaskUseCase
      .execute({ title: "a" })
      .catch((e) => e);

    assert.strictEqual(result.message, "Title must be at least 3 characters");
  });

  it("should throw an error if the task with same title already exists", async () => {
    const createTaskUseCase = new CreateTaskUseCase(repositoryMock);
    repositoryMock.findByTitle = mock.fn(() =>
      Promise.resolve({
        id: 1,
        title: "Task 1",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    const result = await createTaskUseCase
      .execute({ title: "Task 1" })
      .catch((e) => e);

    assert.strictEqual(result.message, "Task with same title already exists");
  });

  it("should throw an error if the task isDone is not a boolean", async () => {
    const createTaskUseCase = new CreateTaskUseCase(repositoryMock);

    const result = await createTaskUseCase
      .execute({
        title: "Task 1",
        // @ts-expect-error - we are testing negative cases
        isDone: "true",
      })
      .catch((e) => e);

    assert.strictEqual(result.message, "isDone must be a boolean");
  });
});

describe("Positive cases for CreateTaskUseCase", () => {
  let repositoryMock: TasksRepository = {
    findAll: mock.fn(),
    findById: mock.fn(),
    findByTitle: mock.fn(),
    create: mock.fn(),
    update: mock.fn(),
    delete: mock.fn(),
  };

  it("should create a task", async () => {
    const createTaskUseCase = new CreateTaskUseCase(repositoryMock);
    repositoryMock.findByTitle = mock.fn(() => Promise.resolve(null));
    repositoryMock.create = mock.fn(() =>
      Promise.resolve({
        id: 1,
        title: "Task 1",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    const result = await createTaskUseCase.execute({ title: "Task 1" });

    assert.strictEqual(result.title, "Task 1");
  });

  it("should create a task with isDone true", async () => {
    const createTaskUseCase = new CreateTaskUseCase(repositoryMock);
    repositoryMock.findByTitle = mock.fn(() => Promise.resolve(null));
    repositoryMock.create = mock.fn(() =>
      Promise.resolve({
        id: 1,
        title: "Task 1",
        isDone: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    const result = await createTaskUseCase.execute({
      title: "Task 1",
      isDone: true,
    });

    assert.strictEqual(result.title, "Task 1");
    assert.strictEqual(result.isDone, true);
  });
});
