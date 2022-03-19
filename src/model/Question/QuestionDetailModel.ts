import { AbstractModel } from "@/base/data/AbstractModel";
import QuestionChoicesModel from "@/model/Question/QuestionChoicesModel";
import { jsonArrayMember, jsonMember, jsonObject, TypedJSON } from "typedjson";

@jsonObject()
export default class QuestionDetailModel extends AbstractModel {
  @jsonMember(Number)
  QuestionID: number;

  @jsonMember(String)
  Version: string;

  @jsonMember(String)
  QuestionText: string;

  @jsonMember(Number)
  RespondentType: number;

  @jsonMember(Number)
  ConditionID: number;

  @jsonMember(Number)
  AnswerType: number;

  @jsonMember(String)
  MediaLink: string;

  @jsonMember(Number)
  UserC: number;

  @jsonMember(Date)
  TimeC: Date;

  @jsonMember(Number)
  UserU: number;

  @jsonMember({ deserializer: value => new Date(value) })
  TimeU: Date;

  @jsonMember(Number)
  NameC: number;

  @jsonArrayMember(QuestionChoicesModel)
  Choices: QuestionChoicesModel[];

  @jsonMember(String)
  Topics: string;

  @jsonMember(String)
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
    this.TimeC = new Date();
    this.UserU = 0;
    this.TimeU = new Date();
    this.NameC = 0;
    this.Choices = [];
    this.Topics = "";
    this.UsingSurveyCount = "";
  }

  getID(): number {
    return this.QuestionID;
  }

  getTypes(): TypedJSON<any> {
    return new TypedJSON(QuestionDetailModel);
  }
}
