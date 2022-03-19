import { BaseModel } from "@/base/data/BaseModel";

export abstract class AbstractModel {
  abstract getID(): number;

  isCreate(): boolean {
    return this.getID() === 0;
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
