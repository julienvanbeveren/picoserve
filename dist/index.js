"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PBearer = exports.PBoolean = exports.PNumber = exports.PString = void 0;
const http_1 = __importDefault(require("http"));
const handleParams_1 = require("./utils/handleParams");
const PicoRequest_1 = require("./utils/PicoRequest");
const REQUEST_1 = require("./utils/REQUEST");
const Param_1 = require("./handlerParams/Param");
Object.defineProperty(exports, "PString", { enumerable: true, get: function () { return Param_1.PString; } });
Object.defineProperty(exports, "PNumber", { enumerable: true, get: function () { return Param_1.PNumber; } });
Object.defineProperty(exports, "PBoolean", { enumerable: true, get: function () { return Param_1.PBoolean; } });
const PicoResponse_1 = require("./utils/PicoResponse");
const parseUrl_1 = require("./utils/parseUrl");
class Pico {
    constructor() {
        this.handlers = [];
    }
    listen(port, callback) {
        this.server = http_1.default.createServer((_req, _res) => {
            const req = new PicoRequest_1.PicoRequest(_req);
            const res = new PicoResponse_1.PicoResponse(_res);
            const router = this.handlers.find((handler) => (0, parseUrl_1.parseUrl)(req.pathname, handler.path)[0] && req.method == handler.method);
            const handler = router === null || router === void 0 ? void 0 : router.handler;
            if (!handler) {
                return res.text(404, `Cannot ${req.method} ${req.url}`);
            }
            const params = (0, parseUrl_1.parseUrl)(req.pathname, router.path)[1];
            req.params = params;
            _res.setHeader("x-powered-by", "PicoServe");
            const requirements = Object.entries(router.options);
            const options = router.options;
            try {
                const resultOptions = (0, handleParams_1.handleParams)(req, requirements);
                try {
                    return handler(req, res, resultOptions);
                }
                catch (err) {
                    res.text(500, "Something broke!");
                }
            }
            catch (err) {
                return res.text(200, err.message);
            }
        });
        this.server.listen(port, "localhost");
        callback === null || callback === void 0 ? void 0 : callback();
    }
    get(path, options, handler) {
        this.handlers.push(new REQUEST_1.REQUEST(path, options, handler, "GET"));
    }
    post(path, options, handler) {
        this.handlers.push(new REQUEST_1.REQUEST(path, options, handler, "POST"));
    }
    delete(path, options, handler) {
        this.handlers.push(new REQUEST_1.REQUEST(path, options, handler, "DELETE"));
    }
    patch(path, options, handler) {
        this.handlers.push(new REQUEST_1.REQUEST(path, options, handler, "PATCH"));
    }
    put(path, options, handler) {
        this.handlers.push(new REQUEST_1.REQUEST(path, options, handler, "PUT"));
    }
}
exports.default = Pico;
var Auth_1 = require("./handlerParams/Auth");
Object.defineProperty(exports, "PBearer", { enumerable: true, get: function () { return Auth_1.PBearer; } });
//# sourceMappingURL=index.js.map