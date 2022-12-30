"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PicoRequest = void 0;
const url_1 = __importDefault(require("url"));
class PicoRequest {
    constructor(req) {
        this.query = url_1.default.parse(req.url, true).query;
        this.host = url_1.default.parse(req.url, true).host;
        this.pathname = url_1.default.parse(req.url, true).pathname;
        this.url = req.url;
        this.method = req.method;
        this.headers = req.headers;
    }
}
exports.PicoRequest = PicoRequest;
//# sourceMappingURL=PicoRequest.js.map