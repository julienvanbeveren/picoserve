"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUrl = void 0;
function parseUrl(path, match) {
    const matchParts = match.match(/\/[^\/]+/g) || [];
    const pathParts = path.match(/\/[^\/]+/g) || [];
    if (matchParts.length != pathParts.length) {
        return [false, {}];
    }
    let params = {};
    for (let i = 0; i < matchParts.length; i++) {
        if (matchParts[i].charAt(1) == ":") {
            params[matchParts[i].slice(2)] = pathParts[i].slice(1);
            continue;
        }
        if (matchParts[i] != pathParts[i]) {
            return [false, params];
        }
    }
    return [true, params];
}
exports.parseUrl = parseUrl;
//# sourceMappingURL=parseUrl.js.map