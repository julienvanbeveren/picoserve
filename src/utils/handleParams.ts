import { PBearer } from "../handlerParams/Auth";
import { PString, PNumber, PBoolean } from "../handlerParams/Param";
import { ModelToType } from "../types";
import { PicoRequest } from "./PicoRequest";

export function handleParams<T extends { [x: string]: any }>(
  req: PicoRequest,
  requirements: [string, unknown][]
): { [key in keyof T as key]: ModelToType<T[key]> } {
  let final = {};

  for (const item of requirements) {
    const key = item[0];
    const type = item[1];

    let value: any = undefined;

    if (type instanceof PString) {
      value = req.query[key] || type.value || undefined;
      if (!value) {
        throw Error(`Missing query param ${key}`);
      }
      if (typeof value != "string") {
        throw Error(`Param ${key} is not of type "string"`);
      }
      final[key] = value;
    }

    if (type instanceof PNumber) {
      value = req.query[key] || type.value || undefined;
      if (value == undefined) {
        throw Error(`Missing query param ${key}`);
      }
      if (isNaN(Number(value))) {
        throw Error(`Param ${key} is not of type "number"`);
      }
      final[key] = Number(value);
    }

    if (type instanceof PBoolean) {
      value = Boolean(req.query[key]) || type.value || undefined;
      if (!value) {
        throw Error(`Missing query param ${key}`);
      }
      if (typeof value != "boolean") {
        throw Error(`Param ${key} is not of type "boolean"`);
      }
      final[key] = value;
    }

    if (type instanceof PBearer) {
      const token = req.headers.authorization?.split(" ") || [0, 0];
      if (!token || token[0] != type.prefix || !token[1]) {
        throw Error(`Missing Bearer token`);
      }
      final[key] = token[1];
    }
  }

  return final as { [key in keyof T as key]: ModelToType<T[key]> };
}
