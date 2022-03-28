import { AbstractModel } from "@/base/data/AbstractModel";
import { jsonMember, jsonObject, TypedJSON } from "typedjson";

@jsonObject()
export default class TopicModel extends AbstractModel {
  @jsonMember(Number)
  TopicID: number;

  @jsonMember(String)
  Topic: string;

  @jsonMember(String)
  NameC: string;
  constructor() {
    super();
    this.TopicID = 0;
    this.Topic = "";
    this.NameC = "";
  }

  getID(): number {
    return 0;
  }

  getTypes(): TypedJSON<any> {
    return new TypedJSON(TopicModel);
  }
}
