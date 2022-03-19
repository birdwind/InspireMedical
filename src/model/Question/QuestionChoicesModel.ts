import { AbstractModel } from "@/base/data/AbstractModel";
import { jsonMember, jsonObject, TypedJSON } from "typedjson";

@jsonObject()
export default class QuestionChoicesModel extends AbstractModel {
  @jsonMember(Number)
  ChoiceID: number;

  @jsonMember(String)
  QuestionID: string;

  @jsonMember(String)
  AnswerText: string;

  @jsonMember(Number)
  Level: number;

  constructor() {
    super();
    this.ChoiceID = 0;
    this.QuestionID = "";
    this.AnswerText = "";
    this.Level = 0;
  }

  getID(): number {
    return this.ChoiceID;
  }

  getTypes(): TypedJSON<any> {
    return new TypedJSON(QuestionChoicesModel);
  }
}
