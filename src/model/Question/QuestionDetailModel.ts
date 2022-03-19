import { AbstractModel } from "@/base/data/AbstractModel";
import QuestionChoicesModel from "@/model/Question/QuestionChoicesModel";

export default class QuestionDetailModel extends AbstractModel {
  QuestionID: number;
  Version: string;
  QuestionText: string;
  RespondentType: number;
  ConditionID: number;
  AnswerType: number;
  MediaLink: string;
  UserC: number;
  TimeC: Date | null;
  UserU: number;
  TimeU: Date | null;
  NameC: number;
  Choices: QuestionChoicesModel[];
  Topics: string;
  UsingSurveyCount: string;

  constructor() {
    super();
    this.QuestionID = 0;
    this.Version = "";
    this.QuestionText = "";
    this.RespondentType = 0;
    this.ConditionID = 0;
    this.AnswerType = 0;
    this.MediaLink = "";
    this.UserC = 0;
    this.TimeC = null;
    this.UserU = 0;
    this.TimeU = null;
    this.NameC = 0;
    this.Choices = [];
    this.Topics = "";
    this.UsingSurveyCount = "";
  }

  getID(): number {
    return this.QuestionID;
  }
}
