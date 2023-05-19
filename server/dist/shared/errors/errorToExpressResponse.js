"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorToExpressResponse = void 0;
const errorToExpressResponse = (error, request, response, next) => {
    if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
    }
    return response.status(500).json({ message: "Internal Server Error" });
};
exports.errorToExpressResponse = errorToExpressResponse;
