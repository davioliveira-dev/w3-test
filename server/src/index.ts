import { app } from "./infra/app";
import { ApiEnv } from "./infra/env";

const PORT = ApiEnv.PORT;

app.listen(PORT, () => console.log("Server is running on port:", PORT));
