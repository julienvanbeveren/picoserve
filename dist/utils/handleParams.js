"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleParams = void 0;
const Auth_1 = require("../handlerParams/Auth");
const Param_1 = require("../handlerParams/Param");
function handleParams(req, requirements) {
    var _a;
    let final = {};
    for (const item of requirements) {
        const key = item[0];
        const type = item[1];
        let value = undefined;
        if (type instanceof Param_1.PString) {
            value = req.query[key] || type.value || undefined;
            if (!value) {
                throw Error(`Missing query param ${key}`);
            }
            if (typeof value != "string") {
                throw Error(`Param ${key} is not of type "string"`);
            }
            final[key] = value;
        }
        if (type instanceof Param_1.PNumber) {
            value = req.query[key] || type.value || undefined;
            if (value == undefined) {
                throw Error(`Missing query param ${key}`);
            }
            if (isNaN(Number(value))) {
                throw Error(`Param ${key} is not of type "number"`);
            }
            final[key] = Number(value);
        }
        if (type instanceof Param_1.PBoolean) {
            value = Boolean(req.query[key]) || type.value || undefined;
            if (!value) {
                throw Error(`Missing query param ${key}`);
            }
            if (typeof value != "boolean") {
                throw Error(`Param ${key} is not of type "boolean"`);
            }
            final[key] = value;
        }
        if (type instanceof Auth_1.PBearer) {
            const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")) || [0, 0];
            if (!token || token[0] != type.prefix || !token[1]) {
                throw Error(`Missing Bearer token`);
            }
            final[key] = token[1];
        }
    }
    return final;
}
exports.handleParams = handleParams;
//# sourceMappingURL=handleParams.js.map