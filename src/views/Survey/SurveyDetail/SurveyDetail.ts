import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { PatientConditionEnum } from "@/enums/PatientConditionEnum";
import { RespondentEnum } from "@/enums/RespondentEnum";
import { ScheduleEnum } from "@/enums/ScheduleEnum";

@Component({})
export default class SurveyDetail extends BaseVue {
  private patientConditionList = [
    {
      text: "survey.patient.alzheimer",
      value: PatientConditionEnum.Alzheimer,
    },
    {
      text: "survey.patient.parkinson",
      value: PatientConditionEnum.Parkinson,
    },
    {
      text: "survey.patient.migraine",
      value: PatientConditionEnum.Migraine,
    },
  ];
  private respondentList = [
    {
      text: "survey.respondents.patient",
      value: RespondentEnum.Patient,
    },
    {
      text: "survey.respondents.caregiver",
      value: RespondentEnum.Caregiver,
    },
    {
      text: "survey.respondents.nurse",
      value: RespondentEnum.Nurse,
    },
  ];
  private scheduleList = [
    {
      text: "survey.schedules.one_month",
      value: ScheduleEnum.oneMonth,
    },
    {
      text: "survey.schedules.two_month",
      value: ScheduleEnum.twoMonth,
    },
    {
      text: "survey.schedules.one_week",
      value: ScheduleEnum.oneWeek,
    },
    {
      text: "survey.schedules.two_week",
      value: ScheduleEnum.twoWeek,
    },
    {
      text: "survey.schedules.one_day",
      value: ScheduleEnum.oneDay,
    },
    {
      text: "survey.schedules.hoc",
      value: ScheduleEnum.hoc,
    },
  ];
  private patientConditionValue = -1;
  private respondentValue = -1;
  private scheduleValue = -1;
  private surveyName = "";
  private description = "";

  $refs!: {
    form: any;
  };

  mounted() {
    this.init();
    // this.$refs.form.setErrors({ "patient.alzheimer": "123" });
  }

  private init() {}

  private clickPatient(patientConditionEnum: PatientConditionEnum) {
    this.patientConditionValue = patientConditionEnum;
  }

  private clickRespondent(respondentEnum: RespondentEnum) {
    this.respondentValue = respondentEnum;
  }

  private clickSchedule(scheduleEnum: ScheduleEnum) {
    this.scheduleValue = scheduleEnum;
  }
}
