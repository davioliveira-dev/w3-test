import { describe, it, mock } from "node:test";
import { ShowTaskUseCase } from "./index";
import { TasksRepository } from "../../repository/Tasks.repository";
import assert from "node:assert";

describe("Negative cases for ShowTaskUseCase", () => {
  let repositoryMock: TasksRepository = {
    findAll: mock.fn(),
    findById: mock.fn(),
    findByTitle: mock.fn(),
    create: mock.fn(),
    update: mock.fn(),
    delete: mock.fn(),
  };

  it("should throw an error if the id is not provided", async () => {
    const showTaskUseCase = new ShowTaskUseCase(repositoryMock);

    const result = await showTaskUseCase
      .execute({ id: undefined })
      .catch((e) => e);

    assert.strictEqual(result.message, "Missing task id");
  });

  it("should throw an error if the task does not exists", async () => {
    repositoryMock.findById = mock.fn(() => Promise.resolve(undefined));
    const showTaskUseCase = new ShowTaskUseCase(repositoryMock);

    const result = await showTaskUseCase.execute({ id: 1 }).catch((e) => e);

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

  it("should show a task", async () => {
    repositoryMock.findById = mock.fn(() =>
      Promise.resolve({
        id: 1,
        title: "Task 1",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    const showTaskUseCase = new ShowTaskUseCase(repositoryMock);

    const result = await showTaskUseCase.execute({ id: 1 });

    assert.strictEqual(result.id, 1);
    assert.strictEqual(result.title, "Task 1");
    assert.strictEqual(result.isDone, false);
  });
});
