export class BaseModel {
  type: any;
}

export type ModelToType<Model extends BaseModel> = Model["type"];
