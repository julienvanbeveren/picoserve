import { ModelToType } from "./types";
import { PicoRequest } from "./utils/PicoRequest";
import { PString, PNumber, PBoolean } from "./handlerParams/Param";
import { PicoResponse } from "./utils/PicoResponse";
export default class Pico {
    private server;
    private handlers;
    constructor();
    listen(port: number, callback?: Function): void;
    get<T extends {
        [x: string]: any;
    }>(path: `/${string}`, options: T, handler: (req: PicoRequest, res: PicoResponse, options: {
        [key in keyof T]: ModelToType<T[key]>;
    }) => any): void;
    post<T extends {
        [x: string]: any;
    }>(path: `/${string}`, options: T, handler: (req: PicoRequest, res: PicoResponse, options: {
        [key in keyof T]: ModelToType<T[key]>;
    }) => any): void;
    delete<T extends {
        [x: string]: any;
    }>(path: `/${string}`, options: T, handler: (req: PicoRequest, res: PicoResponse, options: {
        [key in keyof T]: ModelToType<T[key]>;
    }) => any): void;
    patch<T extends {
        [x: string]: any;
    }>(path: `/${string}`, options: T, handler: (req: PicoRequest, res: PicoResponse, options: {
        [key in keyof T]: ModelToType<T[key]>;
    }) => any): void;
    put<T extends {
        [x: string]: any;
    }>(path: `/${string}`, options: T, handler: (req: PicoRequest, res: PicoResponse, options: {
        [key in keyof T]: ModelToType<T[key]>;
    }) => any): void;
}
export { PString, PNumber, PBoolean };
export { PBearer } from "./handlerParams/Auth";
