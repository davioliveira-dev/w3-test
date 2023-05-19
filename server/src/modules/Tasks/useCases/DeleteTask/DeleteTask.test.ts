import { describe, it, mock } from "node:test";
import { DeleteTaskUseCase } from "./index";
import { TasksRepository } from "../../repository/Tasks.repository";
import assert from "node:assert";

describe("Negative cases for DeleteTaskUseCase", () => {
  let repositoryMock: TasksRepository = {
    findAll: mock.fn(),
    findById: mock.fn(),
    findByTitle: mock.fn(),
    create: mock.fn(),
    update: mock.fn(),
    delete: mock.fn(),
  };

  it("should throw an error if the id is not provided", async () => {
    const deleteTaskUseCase = new DeleteTaskUseCase(repositoryMock);

    const result = await deleteTaskUseCase.execute(undefined).catch((e) => e);

    assert.strictEqual(result.message, "Missing task id");
  });

  it("should throw an error if the task does not exists", async () => {
    repositoryMock.findById = mock.fn(() => Promise.resolve(undefined));
    const deleteTaskUseCase = new DeleteTaskUseCase(repositoryMock);

    const result = await deleteTaskUseCase.execute(1).catch((e) => e);

    assert.strictEqual(result.message, "Task not found");
  });
});

describe("Positive cases for DeleteTaskUseCase", () => {
  let repositoryMock: TasksRepository = {
    findAll: mock.fn(),
    findById: mock.fn(),
    findByTitle: mock.fn(),
    create: mock.fn(),
    update: mock.fn(),
    delete: mock.fn(),
  };

  it("should delete a task", async () => {
    repositoryMock.findById = mock.fn(() =>
      Promise.resolve({
        id: 1,
        title: "Task 1",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    repositoryMock.delete = mock.fn(() => Promise.resolve());

    const deleteTaskUseCase = new DeleteTaskUseCase(repositoryMock);

    const result = await deleteTaskUseCase.execute(1);

    assert.strictEqual(result, undefined);
  });
});
