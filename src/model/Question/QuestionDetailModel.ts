import { AbstractModel } from "@/base/data/AbstractModel";
import QuestionChoicesModel from "@/model/Question/QuestionChoicesModel";
import { jsonArrayMember, jsonMember, jsonObject, TypedJSON } from "typedjson";
import TopicModel from "@/model/Question/TopicModel";

@jsonObject()
export default class QuestionDetailModel extends AbstractModel {
  @jsonMember(Number)
  QuestionID: number;

  @jsonMember(Number)
  Version: number;

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

  @jsonMember({ deserializer: (value) => (value ? new Date(value) : null) })
  TimeC: Date | null;

  @jsonMember(Number)
  UserU: number;

  @jsonMember({ deserializer: (value) => (value ? new Date(value) : null) })
  TimeU: Date | null;

  @jsonMember(String)
  NameC: string;

  @jsonArrayMember(QuestionChoicesModel)
  Choices: QuestionChoicesModel[];

  @jsonArrayMember(TopicModel)
  Topics: TopicModel[];

  @jsonMember(Number)
  UsingSurveyCount: number;

  @jsonMember(Number)
  PrescribedPatientCount: number;

  isAvailable: boolean;

  constructor() {
    super();
    this.QuestionID = 0;
    this.Version = 0;
    this.QuestionText = "";
    this.RespondentType = 0;
    this.ConditionID = 0;
    this.AnswerType = 1;
    this.MediaLink = "";
    this.UserC = 0;
    this.TimeC = null;
    this.UserU = 0;
    this.TimeU = null;
    this.NameC = "0";
    this.Choices = [];
    this.Topics = [];
    this.UsingSurveyCount = 0;
    this.PrescribedPatientCount = 0;
    this.isAvailable = false;
  }

  getID(): number {
    return this.QuestionID;
  }

  getTypes(): TypedJSON<any> {
    return new TypedJSON(QuestionDetailModel);
  }
}
