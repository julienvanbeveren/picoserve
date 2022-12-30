import http from "http";
import { ParsedUrlQuery } from "querystring";
import url from "url";

export class PicoResponse {
  _res: http.ServerResponse;

  constructor(res: http.ServerResponse) {
    this._res = res;
  }

  public json(status: number, value: any) {
    this._res.setHeader("Content-Type", "application/json");
    this._res.writeHead(status);
    this._res.end(JSON.stringify(value));
  }

  public csv(status: number, value: string, fileName: string = "file.csv") {
    this._res.setHeader("Content-Type", "text/csv");
    this._res.writeHead(status);
    this._res.setHeader("Content-Disposition", `attachment;filename=${fileName}`);
    this._res.end(value);
  }

  public html(status: number, value: string) {
    this._res.setHeader("Content-Type", "text/html");
    this._res.writeHead(status);
    this._res.end(value);
  }

  public text(status: number, value: string) {
    this._res.setHeader("Content-Type", "text/plain");
    this._res.writeHead(status);
    this._res.end(value);
  }
}
