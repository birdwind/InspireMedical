export class SurveyDetailModel {
  SurveyID: string;
  UID: string;
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
  QuestionsCount: number;
  Questions: any;
  ConditionName: string;
  RespondentName: string;

  constructor() {
    this.SurveyID = "";
    this.UID = "";
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
    this.NameC = "";
    this.QuestionsCount = 0;
    this.Questions = [];
    this.ConditionName = "";
    this.RespondentName = "";
  }
}
