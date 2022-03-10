import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Watch } from "vue-property-decorator";
import { PatientConditionEnum } from "@/enums/PatientConditionEnum";
import { RespondentEnum } from "@/enums/RespondentEnum";

@Component({})
export default class QuestionDetail extends BaseVue {
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
  private id = 0;
  private patientConditionValue = -1;
  private respondentValue = -1;

  @Watch("$route.params")
  private async watchParams(newVal: any) {
    this.id = newVal.id;
    await this.init();
  }

  private mounted() {}

  private async init() {}

  private clickPatient(patientConditionEnum: PatientConditionEnum) {
    this.patientConditionValue = patientConditionEnum;
  }

  private clickRespondent(respondentEnum: RespondentEnum) {
    this.respondentValue = respondentEnum;
  }
}
