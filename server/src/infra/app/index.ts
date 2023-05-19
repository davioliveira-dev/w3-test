import "express-async-errors";
import express from "express";
import cors from "cors";
import { errorToExpressResponse } from "../../shared/errors/errorToExpressResponse";
import { tasksRouter } from "../../modules/Tasks/Tasks.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/tasks", tasksRouter);
app.use(errorToExpressResponse);

export { app };
