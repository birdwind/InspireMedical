import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { PatientConditionEnum } from "@/enums/PatientConditionEnum";
import { RespondentEnum } from "@/enums/RespondentEnum";
import { ScheduleEnum } from "@/enums/ScheduleEnum";
import Vuedraggable from "vuedraggable";
import { SurveyDetailModel } from "@/model/Survey/SurveyDetailModel";
import { SurveyServer } from "@/server/SurveyServer";
import { Watch } from "vue-property-decorator";
import QuestionDetailModel from "@/model/Question/QuestionDetailModel";
import question from "@/store/module/question";
import { Getter } from "vuex-class";
import QuestionPreviewComponent from "@/components/QuestionPreview/QuestionPreview.component.vue";
import { simplyComparison } from "@/utils/ObjectUtils";
import { MyLogger } from "@/base/utils/MyLogger";

@Component({
  components: {
    Vuedraggable,
    QuestionPreviewComponent,
  },
})
export default class SurveyDetail extends BaseVue {
  @Getter("Question/answerType")
  private answerTypes!: any[];

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
  private availableQuestions: QuestionDetailModel[] = [];
  private surveyDetailModel = new SurveyDetailModel();
  private surveyDetailModelTemp = new SurveyDetailModel();
  private questionTempCount = 0;

  $refs!: any;

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
          this.surveyDetailModel = this.surveyDetailModel.parse(response);
        });
      });
      this.cloneModel();
    }
  }

  private cloneModel() {
    this.surveyDetailModelTemp = Object.assign({}, this.surveyDetailModel);
    this.questionTempCount = this.surveyDetailModel.Questions.length;
  }

  private async availableQuestionsAPI(respondent: number, condition: number) {
    await this.executeAsync(async () => {
      await SurveyServer.availableQuestions(respondent, condition).then((response) => {
        this.availableQuestions = [];
        response.QuestionList.forEach((item: any) => {
          this.availableQuestions.push(new QuestionDetailModel().parse(item));
        });
      });
      this.handlerAvailableQuestionDragable();
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

  private get isCompare() {
    if (!simplyComparison(this.surveyDetailModel, this.surveyDetailModelTemp)) {
      return false;
    } else {
      if (this.surveyDetailModel.Questions.length !== this.questionTempCount) {
        return false;
      } else {
        for (let i = 0; i < this.questionTempCount; i++) {
          if (this.surveyDetailModel.Questions[i].QuestionID !== this.surveyDetailModelTemp.Questions[i].QuestionID) {
            return false;
          }
        }
      }
      return true;
    }
  }

  private clickPatient(patientConditionEnum: PatientConditionEnum) {
    if (this.surveyDetailModel.isCreate()) {
      this.surveyDetailModel.ConditionID = patientConditionEnum.valueOf();
    }
  }

  private clickRespondent(respondentEnum: RespondentEnum) {
    if (this.surveyDetailModel.isCreate()) {
      this.surveyDetailModel.RespondentType = respondentEnum.valueOf();
    }
  }

  private clickSchedule(scheduleEnum: ScheduleEnum) {
    this.surveyDetailModel.SurveySchedule = scheduleEnum;
  }

  private questionAnswerType(item: QuestionDetailModel) {
    const answerType = this.answerTypes
      .filter((type: any) => {
        return type.AnswerTypeID === item.AnswerType;
      })
      .map((type: any) => type.AnswerType)[0]
      .replace("question.types.", "")
      .replace("/", "");
    return `icon-${answerType}`;
  }

  private handlerAvailableQuestionDragable() {
    if (this.surveyDetailModel.Questions.length >= 0) {
      this.availableQuestions.forEach((questionItem) => {
        this.$nextTick(() => {
          this.$refs[`available_question_${questionItem.QuestionID}`][0].classList.remove("selected");
        });
      });

      this.surveyDetailModel.Questions.forEach((questionItem) => {
        const selected = this.availableQuestions.filter((available) => {
          return questionItem.QuestionID === available.QuestionID;
        });

        this.$nextTick(() => {
          this.$refs[`available_question_${selected[0].QuestionID}`][0].classList.add("selected");
        });
      });
    }
  }

  private handlerMove(evt: any, originalEvent: any) {
    if (evt.from.className.indexOf("question-drag_drop-group-left") !== -1 && evt.from.className === evt.to.className) {
      return false;
    }
  }

  private handlerEndDrag(evt: any) {
    this.handlerAvailableQuestionDragable();
  }

  private removeSelectedQuestion(questionItem: QuestionDetailModel) {
    this.surveyDetailModel.Questions = this.surveyDetailModel.Questions.filter((item) => {
      return item.QuestionID !== questionItem.QuestionID;
    });
    this.handlerAvailableQuestionDragable();
  }

  private async save() {
    await this.executeAsync(async () => {
      await SurveyServer.saveSurvey(this.surveyDetailModel).then((response) => {
        if (this.surveyDetailModel.isCreate()) {
          this.routerLink(`/survey`);
        } else {
          this.reloadPage();
          this.cloneModel();
        }
      });
    });
  }
}
