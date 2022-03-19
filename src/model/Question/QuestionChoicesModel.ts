import { AbstractModel } from "@/base/data/AbstractModel";

export default class QuestionChoicesModel extends AbstractModel {
  ChoiceID: number;
  QuestionID: string;
  AnswerText: string;
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
}
