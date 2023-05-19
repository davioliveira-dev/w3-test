import { after, before, describe, it } from "node:test";
import assert from "node:assert";
import { Server } from "node:http";
import { app } from "@/infra/app";
import { ApiEnv } from "@/infra/env";
import { makeRequest } from "@/shared/utils/makeRequest";

describe("Integration tests for CreateTaskUseCase", () => {
  const baseUrl = ApiEnv.BASE_URL + "/tasks";
  let _server: Server;

  before(async () => {
    _server = app.listen(3333);
    await new Promise((resolve) => _server.once("listening", resolve));
  });

  it("should create a new task", async () => {
    const response = await makeRequest(baseUrl, {
      method: "POST",
      body: { title: "Test task" },
    });

    const data = await response.json();

    assert.strictEqual(response.status, 201);
    assert.strictEqual(data.title, "Test task");
    assert.strictEqual(data.isDone, false);
  });

  it("should create a new task with isDone true", async () => {
    const response = await makeRequest(baseUrl, {
      method: "POST",
      body: { title: "Test task 2", isDone: true },
    });

    const data = await response.json();

    assert.strictEqual(response.status, 201);
    assert.strictEqual(data.title, "Test task 2");
    assert.strictEqual(data.isDone, true);
  });

  after((done) => {
    _server.close(done);
  });
});
