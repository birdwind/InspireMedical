import { Serializable } from "@/base/data/Serializable";

export interface BaseModel2 extends Serializable {
  new (): Object;
  getID(): number;
  isCreate(): boolean;
}
