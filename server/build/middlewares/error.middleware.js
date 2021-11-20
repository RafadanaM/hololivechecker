"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message || "something went wrong";
    response.status(status).send({ status, message });
}
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map