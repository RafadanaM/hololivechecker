"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundMiddleware = void 0;
function NotFoundMiddleware(req, res, next) {
    const status = 404;
    const message = "Route Not Found";
    const path = req.path;
    const method = req.method;
    return res.status(status).send({ status, message, path, method });
}
exports.NotFoundMiddleware = NotFoundMiddleware;
//# sourceMappingURL=notfound.middleware.js.map