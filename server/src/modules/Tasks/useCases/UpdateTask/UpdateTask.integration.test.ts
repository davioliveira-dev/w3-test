import { after, before, describe, it } from "node:test";
import assert from "node:assert";
import { Server } from "node:http";
import { app } from "@/infra/app";
import { makeRequest } from "@/shared/utils/makeRequest";

describe("Integration tests for UpdateTaskUseCase", () => {
  const port = 3334;
  const baseUrl = `http://localhost:${port}/tasks`;
  let _server: Server;

  before(async () => {
    _server = app.listen(port);
    await new Promise((resolve) => _server.once("listening", resolve));
    await makeRequest(baseUrl, {
      method: "POST",
      body: { title: "Test task" },
    });
  });

  it("should update a new task", async () => {
    const mockTaskId = 1;
    const url = `${baseUrl}/${mockTaskId}`;
    const response = await makeRequest(url, {
      method: "PUT",
      body: { title: "Test task 11" },
    });

    const data = await response.json();

    assert.strictEqual(response.status, 201);
    assert.strictEqual(data.title, "Test task 11");
    assert.strictEqual(data.isDone, false);
  });

  it("should update a new task with isDone true", async () => {
    const mockTaskId = 1;
    const url = `${baseUrl}/${mockTaskId}`;
    const response = await makeRequest(url, {
      method: "PUT",
      body: { isDone: true },
    });

    const data = await response.json();

    assert.strictEqual(response.status, 201);
    assert.strictEqual(data.title, "Test task 11");
    assert.strictEqual(data.isDone, true);
  });

  after((done) => {
    _server.close(done);
  });
});
