/// <reference types="node" />
import http from "http";
export declare class PicoResponse {
    _res: http.ServerResponse;
    constructor(res: http.ServerResponse);
    json(status: number, value: any): void;
    csv(status: number, value: string, fileName?: string): void;
    html(status: number, value: string): void;
    text(status: number, value: string): void;
}
