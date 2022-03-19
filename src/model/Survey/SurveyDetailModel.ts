import { AbstractModel } from "@/base/data/AbstractModel";
import QuestionDetailModel from "@/model/Question/QuestionDetailModel";
import "reflect-metadata";
import { jsonArrayMember, jsonMember, jsonObject, TypedJSON } from "typedjson";

@jsonObject()
export class SurveyDetailModel extends AbstractModel {
  @jsonMember(Number)
  SurveyID: number;

  @jsonMember(Number)
  UID: number;

  @jsonMember(Number)
  ConditionID: number;

  @jsonMember(Number)
  RespondentType: number;

  @jsonMember(Number)
  SurveySchedule: number;

  @jsonMember(String)
  SurveyName: string;

  @jsonMember(String)
  SurveyDescription: string;

  @jsonMember(Number)
  UserC: number;

  @jsonMember({ deserializer: (value) => (value ? new Date(value) : null) })
  TimeC: Date | null;

  @jsonMember(Number)
  UserU: number;

  @jsonMember({ deserializer: (value) => (value ? new Date(value) : null) })
  TimeU: Date | null;

  @jsonMember(Boolean)
  IsEnable: boolean;

  @jsonMember(String)
  NameC: string;

  @jsonMember(Number)
  PrescribedPatientCount: number;

  @jsonMember(Number)
  QuestionsCount: number;

  @jsonArrayMember(QuestionDetailModel)
  Questions: QuestionDetailModel[];

  @jsonMember(String)
  ConditionName: string;

  @jsonMember(String)
  RespondentName: string;

  constructor() {
    super();
    this.SurveyID = 0;
    this.UID = 0;
    this.ConditionID = 0;
    this.RespondentType = 0;
    this.SurveySchedule = 0;
    this.SurveyName = "";
    this.SurveyDescription = "";
    this.UserC = 0;
    this.TimeC = null;
    this.UserU = 0;
    this.TimeU = null;
    this.IsEnable = false;
    this.PrescribedPatientCount = 0;
    this.NameC = "";
    this.QuestionsCount = 0;
    this.Questions = [];
    this.ConditionName = "";
    this.RespondentName = "";
  }

  getID(): number {
    return this.SurveyID;
  }

  getTypes(): TypedJSON<any> {
    return new TypedJSON(SurveyDetailModel);
  }
}
