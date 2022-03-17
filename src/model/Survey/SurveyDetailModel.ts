import { BaseModel, ModelID } from "@/base/data/BaseModel";

export class SurveyDetailModel extends BaseModel {
  @ModelID
  SurveyID: number;
  UID: number;
  ConditionID: number;
  RespondentType: number;
  SurveySchedule: number;
  SurveyName: string;
  SurveyDescription: string;
  UserC: number;
  TimeC: Date | null;
  UserU: number;
  TimeU: Date | null;
  IsEnable: boolean | null;
  NameC: string;
  PrescribedPatientCount: number;
  QuestionsCount: number;
  Questions: any;
  ConditionName: string;
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
    this.IsEnable = null;
    this.PrescribedPatientCount = 0;
    this.NameC = "";
    this.QuestionsCount = 0;
    this.Questions = [];
    this.ConditionName = "";
    this.RespondentName = "";
  }
}
