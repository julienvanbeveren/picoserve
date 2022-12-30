import { PicoRequest } from "./PicoRequest";
import { ModelToType } from "../types";
import { PicoResponse } from "./PicoResponse";
export declare class REQUEST<T extends {
    [x: string]: any;
}> {
    path: string;
    options: T;
    handler: (req: PicoRequest, res: PicoResponse, options: {
        [key in keyof T]: ModelToType<T[key]>;
    }) => any;
    method: string;
    constructor(path: string, options: T, handler: (req: PicoRequest, res: PicoResponse, options: {
        [key in keyof T]: ModelToType<T[key]>;
    }) => any, method: string);
}
