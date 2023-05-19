"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./infra/app");
const env_1 = require("./infra/env");
const PORT = env_1.ApiEnv.PORT;
app_1.app.listen(PORT, () => console.log("Server is running on port:", PORT));
