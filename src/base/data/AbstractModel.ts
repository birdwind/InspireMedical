import { BaseModel } from "@/base/data/BaseModel";
import { TypedJSON } from "typedjson";

export abstract class AbstractModel implements BaseModel {
  abstract getID(): number;
  abstract getTypes(): TypedJSON<any>;

  isCreate(): boolean {
    return this.getID() === 0;
  }

  parse(json: string) {
    return this.getTypes().parse(json);
  }

  json(baseMode?: AbstractModel) {
    if (baseMode) {
      return this.deserialize(baseMode);
    } else {
      return this;
    }
  }

  private deserialize(instanceData: AbstractModel) {
    const keys = Object.keys(this);

    for (const key of keys) {
      if (instanceData.hasOwnProperty(key)) {
        // @ts-ignore
        this[key] = instanceData[key];
      }
    }
    return this;
  }
}
