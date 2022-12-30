"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PicoResponse = void 0;
class PicoResponse {
    constructor(res) {
        this._res = res;
    }
    json(status, value) {
        this._res.setHeader("Content-Type", "application/json");
        this._res.writeHead(status);
        this._res.end(JSON.stringify(value));
    }
    csv(status, value, fileName = "file.csv") {
        this._res.setHeader("Content-Type", "text/csv");
        this._res.writeHead(status);
        this._res.setHeader("Content-Disposition", `attachment;filename=${fileName}`);
        this._res.end(value);
    }
    html(status, value) {
        this._res.setHeader("Content-Type", "text/html");
        this._res.writeHead(status);
        this._res.end(value);
    }
    text(status, value) {
        this._res.setHeader("Content-Type", "text/plain");
        this._res.writeHead(status);
        this._res.end(value);
    }
}
exports.PicoResponse = PicoResponse;
//# sourceMappingURL=PicoResponse.js.map