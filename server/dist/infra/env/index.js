"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiEnv = void 0;
class ApiEnv {
}
_a = ApiEnv;
ApiEnv.PORT = process.env.PORT || 3333;
ApiEnv.NODE_ENV = process.env.NODE_ENV || "development";
ApiEnv.BASE_URL = process.env.BASE_URL || `http://localhost:${_a.PORT}`;
exports.ApiEnv = ApiEnv;
exports.default = new ApiEnv();
