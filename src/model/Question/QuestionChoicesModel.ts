import { AbstractModel } from "@/base/data/AbstractModel";
import { jsonMember, jsonObject, TypedJSON } from "typedjson";
import { UUID } from "uuid-generator-ts";

@jsonObject()
export default class QuestionChoicesModel extends AbstractModel {
  @jsonMember(Number, { deserializer: (value) => Number(value) })
  ChoiceID: number | string;

  @jsonMember(Number)
  QuestionID: number;

  @jsonMember(String)
  AnswerText: string;

  @jsonMember(Number)
  Level: number;

  @jsonMember(String)
  MediaLink: string;

  constructor() {
    super();
    this.ChoiceID = new UUID().toString();
    this.QuestionID = 0;
    this.AnswerText = "";
    this.Level = 0;
    this.MediaLink = "";
  }

  getID(): number {
    if (typeof this.ChoiceID === "number") {
      return this.ChoiceID;
    } else {
      return 0;
    }
  }

  getTypes(): TypedJSON<any> {
    return new TypedJSON(QuestionChoicesModel);
  }
}
