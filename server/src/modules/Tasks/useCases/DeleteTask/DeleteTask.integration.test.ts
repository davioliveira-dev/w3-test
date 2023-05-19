import { after, before, describe, it } from "node:test";
import assert from "node:assert";
import { Server } from "node:http";
import { app } from "@/infra/app";
import { makeRequest } from "@/shared/utils/makeRequest";

describe("Integration tests for DeleteTaskUseCase", () => {
  const port = 3388;
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

  it("should delete a task", async () => {
    const mockTaskId = 1;
    const url = `${baseUrl}/${mockTaskId}`;
    const response = await makeRequest(url, {
      method: "DELETE",
    });

    assert.strictEqual(response.status, 201);
  });

  after((done) => {
    _server.close(done);
  });
});
