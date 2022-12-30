/// <reference types="node" />
/// <reference types="node" />
import http from "http";
import { ParsedUrlQuery } from "querystring";
export declare class PicoRequest {
    query: ParsedUrlQuery;
    host: string;
    pathname: string;
    url: string;
    method: string;
    params: {
        [x: string]: string;
    };
    headers: http.IncomingHttpHeaders;
    constructor(req: http.IncomingMessage);
}
