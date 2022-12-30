import { PicoRequest } from "./PicoRequest";
import http from "http";
import { ModelToType } from "../types";
import { PicoResponse } from "./PicoResponse";

export class REQUEST<T extends { [x: string]: any }> {
  path: string;
  options: T;
  handler: (
    req: PicoRequest,
    res: PicoResponse,
    options: { [key in keyof T]: ModelToType<T[key]> }
  ) => any;
  method: string;

  constructor(
    path: string,
    options: T,
    handler: (
      req: PicoRequest,
      res: PicoResponse,
      options: { [key in keyof T]: ModelToType<T[key]> }
    ) => any,
    method: string
  ) {
    this.path = path;
    this.options = options;
    this.handler = handler;
    this.method = method;
  }
}
