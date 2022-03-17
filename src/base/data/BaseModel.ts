import { MyLogger } from "@/base/utils/MyLogger";
const DECORATORS = new Map<string, Map<string, string[]>>();

function findDecoratorsInScope(theScope: any) {
  MyLogger.log(theScope);
  for (const prop in theScope) {
    if (theScope[prop]["ModelID"]) {
      MyLogger.log("輸出", `${prop} 是${theScope[prop]["ModelID"]}!`);
    } else {
      MyLogger.log("輸出", `${prop} 不是 ModelID`);
    }
  }
  return true;
}
export const ModelID = (target: any, property: string) => {
  // target.baseModelID = target[memberName];
  // MyLogger.log(memberName, target.baseModelID);
};

export abstract class BaseModel {
  baseModelID = "123";
  isNew() {
    return findDecoratorsInScope(this);
  }

  json(baseMode?: BaseModel) {
    if (baseMode) {
      return this.deserialize(baseMode);
    } else {
      return this;
    }
  }

  private deserialize(instanceData: BaseModel) {
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
