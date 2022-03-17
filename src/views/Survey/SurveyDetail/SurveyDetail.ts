import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { PatientConditionEnum } from "@/enums/PatientConditionEnum";
import { RespondentEnum } from "@/enums/RespondentEnum";
import { ScheduleEnum } from "@/enums/ScheduleEnum";
import Vuedraggable from "vuedraggable";
import { MyLogger } from "@/base/utils/MyLogger";
import { SurveyDetailModel } from "@/model/Survey/SurveyDetailModel";
import { SurveyServer } from "@/server/SurveyServer";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    Vuedraggable,
  },
})
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
  private id = 0;
  private temp = [1, 2, 3, 4, 5, 6];
  private tempIndex = -1;
  private surveyDetailModel = new SurveyDetailModel();

  $refs!: {
    form: any;
  };

  @Watch("$route.params")
  private async watchParams(newVal: any) {
    this.id = newVal.id;
    await this.init();
  }

  @Watch("surveyDetailModel.ConditionID")
  private async watchCondition(newVal: number) {
    if (this.surveyDetailModel.RespondentType) {
      await this.availableQuestionsAPI(this.surveyDetailModel.RespondentType, this.surveyDetailModel.ConditionID);
    }
  }

  @Watch("surveyDetailModel.RespondentType")
  private async watchRespondentType(newVal: number) {
    if (this.surveyDetailModel.ConditionID) {
      await this.availableQuestionsAPI(this.surveyDetailModel.RespondentType, this.surveyDetailModel.ConditionID);
    }
  }

  private async mounted() {
    this.id = Number(this.$route.params.id);
    await this.init();
    // this.$refs.form.setErrors({ "patient.alzheimer": "123" });
  }

  private async init() {
    if (this.id === 0) {
      this.surveyDetailModel = new SurveyDetailModel();
    } else {
      await this.executeAsync(async () => {
        await SurveyServer.surveyDetail(this.id).then((response) => {
          this.surveyDetailModel = new SurveyDetailModel().json(response);
        });
      });
    }
  }

  private async availableQuestionsAPI(respondent: number, condition: number) {
    await this.executeAsync(async () => {
      await SurveyServer.availableQuestions(respondent, condition).then((response) => {});
    });
  }

  private get dragOptions() {
    return {
      animation: 200,
      group: "question",
      disabled: false,
      ghostClass: "ghost",
    };
  }

  private clickPatient(patientConditionEnum: PatientConditionEnum) {
    this.surveyDetailModel.ConditionID = patientConditionEnum.valueOf();
  }

  private clickRespondent(respondentEnum: RespondentEnum) {
    this.surveyDetailModel.RespondentType = respondentEnum.valueOf();
  }

  private clickSchedule(scheduleEnum: ScheduleEnum) {
    this.surveyDetailModel.SurveySchedule = scheduleEnum;
  }

  private handlerMove(evt: any, originalEvent: any) {
    MyLogger.log(evt);
  }

  private handlerEndDrag() {
    MyLogger.log("EndDrag");
  }

  async save() {
    MyLogger.log(this.surveyDetailModel.isNew());
    // if(this.surveyDetailModel.SurveyID === 0){
    //
    // }else{
    //
    // }
    // await SurveyServer.saveSurvey(this.surveyDetailModel);
  }
}
