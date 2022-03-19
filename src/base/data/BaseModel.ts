import { Serializable } from "@/base/data/Serializable";

export interface BaseModel {
  getID(): number;
  isCreate(): boolean;
}
