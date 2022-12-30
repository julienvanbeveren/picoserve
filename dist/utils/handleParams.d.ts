import { ModelToType } from "../types";
import { PicoRequest } from "./PicoRequest";
export declare function handleParams<T extends {
    [x: string]: any;
}>(req: PicoRequest, requirements: [string, unknown][]): {
    [key in keyof T as key]: ModelToType<T[key]>;
};
