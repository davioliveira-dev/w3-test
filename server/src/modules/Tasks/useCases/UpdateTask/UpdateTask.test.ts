import { describe, it, mock } from "node:test";
import { UpdateTaskUseCase } from "./index";
import { TasksRepository } from "../../repository/Tasks.repository";
import assert from "node:assert";

describe("Negative cases for UpdateTaskUseCase", () => {
  let repositoryMock: TasksRepository = {
    findAll: mock.fn(),
    findById: mock.fn(),
    findByTitle: mock.fn(),
    create: mock.fn(),
    update: mock.fn(),
    delete: mock.fn(),
  };

  it("should throw an error if the task title is not a string", async () => {
    repositoryMock.findById = mock.fn(() =>
      Promise.resolve({
        id: 1,
        title: "Task 1",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    const updateTaskUseCase = new UpdateTaskUseCase(repositoryMock);

    const result = await updateTaskUseCase
      // @ts-expect-error - we are testing negative cases
      .execute({ id: 1, title: 123 })
      .catch((e) => e);

    assert.strictEqual(result.message, "Title must be a string");
  });

  it("should throw an error if the task title is longer than 255 characters", async () => {
    repositoryMock.findById = mock.fn(() =>
      Promise.resolve({
        id: 1,
        title: "Task 1",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    const updateTaskUseCase = new UpdateTaskUseCase(repositoryMock);
    const result = await updateTaskUseCase
      .execute({ id: 1, title: "a".repeat(256) })
      .catch((e) => e);

    assert.strictEqual(
      result.message,
      "Title must be less than 255 characters"
    );
  });

  it("should throw an error if the task title is shorter than 3 characters", async () => {
    repositoryMock.findById = mock.fn(() =>
      Promise.resolve({
        id: 1,
        title: "Task 1",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    const updateTaskUseCase = new UpdateTaskUseCase(repositoryMock);
    const result = await updateTaskUseCase
      .execute({ id: 1, title: "a" })
      .catch((e) => e);

    assert.strictEqual(result.message, "Title must be at least 3 characters");
  });

  it("should throw an error if the task with same title already exists", async () => {
    repositoryMock.findById = mock.fn(() =>
      Promise.resolve({
        id: 1,
        title: "Task 1",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    const updateTaskUseCase = new UpdateTaskUseCase(repositoryMock);
    repositoryMock.findByTitle = mock.fn(() =>
      Promise.resolve({
        id: 2,
        title: "Task 1",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    const result = await updateTaskUseCase
      .execute({ id: 1, title: "Task 1" })
      .catch((e) => e);

    assert.strictEqual(result.message, "Task with same title already exists");
  });

  it("should throw an error if the task isDone is not a boolean", async () => {
    repositoryMock.findById = mock.fn(() =>
      Promise.resolve({
        id: 1,
        title: "Task 1",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    const updateTaskUseCase = new UpdateTaskUseCase(repositoryMock);

    const result = await updateTaskUseCase
      .execute({
        id: 1,
        // @ts-expect-error - we are testing negative cases
        isDone: "true",
      })
      .catch((e) => e);

    assert.strictEqual(result.message, "isDone must be a boolean");
  });
});

describe("Positive cases for updateTaskUseCase", () => {
  let repositoryMock: TasksRepository = {
    findAll: mock.fn(),
    findById: mock.fn(),
    findByTitle: mock.fn(),
    create: mock.fn(),
    update: mock.fn(),
    delete: mock.fn(),
  };

  it("should update a task", async () => {
    repositoryMock.findById = mock.fn(() =>
      Promise.resolve({
        id: 1,
        title: "Task 1",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    repositoryMock.update = mock.fn(() =>
      Promise.resolve({
        id: 1,
        title: "Task 11",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    const updateTaskUseCase = new UpdateTaskUseCase(repositoryMock);

    const result = await updateTaskUseCase.execute({ id: 1, title: "Task 11" });

    assert.strictEqual(result.title, "Task 11");
  });

  it("should update a task with isDone true", async () => {
    repositoryMock.findById = mock.fn(() =>
      Promise.resolve({
        id: 1,
        title: "Task 1",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    repositoryMock.update = mock.fn(() =>
      Promise.resolve({
        id: 1,
        title: "Task 1",
        isDone: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    const updateTaskUseCase = new UpdateTaskUseCase(repositoryMock);

    const result = await updateTaskUseCase.execute({
      id: 1,
      isDone: true,
    });

    assert.strictEqual(result.title, "Task 1");
    assert.strictEqual(result.isDone, true);
  });
});
