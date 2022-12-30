export declare class BaseModel {
    type: any;
}
export declare type ModelToType<Model extends BaseModel> = Model["type"];
