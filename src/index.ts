import http from "http";
import { ModelToType } from "./types";
import { handleParams } from "./utils/handleParams";
import { PicoRequest } from "./utils/PicoRequest";
import { REQUEST } from "./utils/REQUEST";
import { PString, PNumber, PBoolean } from "./handlerParams/Param";
import { PicoResponse } from "./utils/PicoResponse";
import { parseUrl } from "./utils/parseUrl";

export default class Pico {
  private server: http.Server;
  private handlers: REQUEST<any>[] = [];

  constructor() {}

  public listen(port: number, callback?: Function) {
    this.server = http.createServer((_req, _res) => {
      const req = new PicoRequest(_req) as PicoRequest;
      const res = new PicoResponse(_res) as PicoResponse;
      const router = this.handlers.find(
        (handler) => parseUrl(req.pathname, handler.path)[0] && req.method == handler.method
      );
      const handler = router?.handler;
      if (!handler) {
        return res.text(404, `Cannot ${req.method} ${req.url}`);
      }
      const params = parseUrl(req.pathname, router.path)[1];
      req.params = params;
      _res.setHeader("x-powered-by", "PicoServe");
      const requirements = Object.entries(router.options);
      const options = router.options;
      try {
        const resultOptions = handleParams<typeof options>(req, requirements);
        try {
          return handler(req, res, resultOptions);
        } catch (err) {
          res.text(500, "Something broke!");
        }
      } catch (err) {
        return res.text(200, err.message);
      }
    });
    this.server.listen(port, "localhost");
    callback?.();
  }

  public get<T extends { [x: string]: any }>(
    path: `/${string}`,
    options: T,
    handler: (
      req: PicoRequest,
      res: PicoResponse,
      options: { [key in keyof T]: ModelToType<T[key]> }
    ) => any
  ) {
    this.handlers.push(new REQUEST<T>(path, options, handler, "GET"));
  }

  public post<T extends { [x: string]: any }>(
    path: `/${string}`,
    options: T,
    handler: (
      req: PicoRequest,
      res: PicoResponse,
      options: { [key in keyof T]: ModelToType<T[key]> }
    ) => any
  ) {
    this.handlers.push(new REQUEST<T>(path, options, handler, "POST"));
  }

  public delete<T extends { [x: string]: any }>(
    path: `/${string}`,
    options: T,
    handler: (
      req: PicoRequest,
      res: PicoResponse,
      options: { [key in keyof T]: ModelToType<T[key]> }
    ) => any
  ) {
    this.handlers.push(new REQUEST<T>(path, options, handler, "DELETE"));
  }

  public patch<T extends { [x: string]: any }>(
    path: `/${string}`,
    options: T,
    handler: (
      req: PicoRequest,
      res: PicoResponse,
      options: { [key in keyof T]: ModelToType<T[key]> }
    ) => any
  ) {
    this.handlers.push(new REQUEST<T>(path, options, handler, "PATCH"));
  }

  public put<T extends { [x: string]: any }>(
    path: `/${string}`,
    options: T,
    handler: (
      req: PicoRequest,
      res: PicoResponse,
      options: { [key in keyof T]: ModelToType<T[key]> }
    ) => any
  ) {
    this.handlers.push(new REQUEST<T>(path, options, handler, "PUT"));
  }
}
export { PString, PNumber, PBoolean };
export { PBearer } from "./handlerParams/Auth";
