import http from "http";
import { ParsedUrlQuery } from "querystring";
import url from "url";

export class PicoRequest {
  public query: ParsedUrlQuery;
  public host: string;
  public pathname: string;
  public url: string;
  public method: string;
  public params: { [x: string]: string };
  public headers: http.IncomingHttpHeaders;

  constructor(req: http.IncomingMessage) {
    this.query = url.parse(req.url as string, true).query;
    this.host = url.parse(req.url as string, true).host as string;
    this.pathname = url.parse(req.url as string, true).pathname as string;
    this.url = req.url as string;
    this.method = req.method as string;
    this.headers = req.headers;
  }
}
