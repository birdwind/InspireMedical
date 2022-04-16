import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { i18n } from "@/base/config";
import { MedicalTableModel } from "@/model/MedicalTableModel";
import { Watch } from "vue-property-decorator";
import { QuestionServer } from "@/server/QuestionServer";
import { Getter } from "vuex-class";
import { MyLogger } from "@/base/utils/MyLogger";
import { RespondentEnum } from "@/enums/RespondentEnum";
import { PatientConditionEnum } from "@/enums/PatientConditionEnum";

@Component({})
export default class QuestionList extends BaseVue {
  @Getter("Question/answerType")
  private answerTypes!: any;
  private respondentList = [
    {
      text: "question.respondents.patient",
      value: RespondentEnum.Patient,
    },
    {
      text: "question.respondents.caregiver",
      value: RespondentEnum.Caregiver,
    },
    {
      text: "question.respondents.nurse",
      value: RespondentEnum.Nurse,
    },
  ];
  private patientConditionList = [
    {
      text: "question.patient.alzheimer",
      value: PatientConditionEnum.Alzheimer,
    },
    {
      text: "question.patient.parkinson",
      value: PatientConditionEnum.Parkinson,
    },
    {
      text: "question.patient.migraine",
      value: PatientConditionEnum.Migraine,
    },
  ];
  private tableLoading = false;
  private medicalTableModel: MedicalTableModel = new MedicalTableModel();

  private get questionListHeaderModel() {
    return [
      {
        text: i18n.t("question.name"),
        value: "QuestionText",
      },
      {
        text: i18n.t("question.condition"),
        value: "ConditionText",
      },
      {
        text: i18n.t("question.type"),
        value: "AnswerTypeText",
      },
      {
        text: i18n.t("question.respondent"),
        value: "RespondentTypeText",
      },
      {
        text: i18n.t("question.createdDate"),
        value: "TimeC",
      },
      {
        text: i18n.t("question.modifiedDate"),
        value: "TimeU",
      },
      {
        text: i18n.t("question.use"),
        value: "UsingSurveyCount",
      },
      {
        text: i18n.t("question.created"),
        value: "NameC",
      },
    ];
  }

  private get startOfPage() {
    if (this.medicalTableModel.totalData > this.medicalTableModel.currentItemStart) {
      return this.medicalTableModel.currentItemStart;
    } else {
      return this.medicalTableModel.totalData;
    }
  }

  private get endOfPage() {
    if (this.medicalTableModel.totalData < this.medicalTableModel.currentItemEnd) {
      return this.medicalTableModel.totalData;
    } else {
      return this.medicalTableModel.currentItemEnd;
    }
  }

  async mounted() {
    await this.init();
  }

  private async init() {}

  /*
   * 監聽分頁
   */
  @Watch("medicalTableModel.options.page")
  private async watchMedicalTableModelOption(newVal: any) {
    MyLogger.log(newVal);
    await this.updateQuestionList(newVal);
  }

  private async updateQuestionList(page: number) {
    await this.executeComponentAsync(
      async () => {
        await QuestionServer.questionList(page - 1).then((response) => {
          if (response) {
            response.QuestionList.forEach((item: any) => {
              item.TimeC = item.TimeC ? new Date(item.TimeC) : "--";
              item.TimeU = item.TimeU ? new Date(item.TimeU) : "--";
              item.AnswerTypeText = this.answerTypes
                .filter((type: any) => {
                  return type.AnswerTypeID === item.AnswerType;
                })
                .map((type: any) => type.AnswerType)[0];
              item.RespondentTypeText = this.respondentList
                .filter((respondent) => {
                  return respondent.value === item.RespondentType;
                })
                .map((respondent) => respondent.text)[0];
              item.ConditionText = this.patientConditionList
                .filter((condition) => {
                  return condition.value === item.ConditionID;
                })
                .map((respondent) => respondent.text)[0];
            });
            this.medicalTableModel.data = response.QuestionList;
            this.medicalTableModel.totalData = response.QuestionCount;
          }
        });
      },
      (isShowLoading) => (this.tableLoading = isShowLoading)
    );
  }

  private sort(header: any, asc: boolean) {
    if (header.value !== this.medicalTableModel.sortBy) {
      this.medicalTableModel.sortBy = header.value;
      this.medicalTableModel.sortDesc = asc;
    } else if (header.value === this.medicalTableModel.sortBy && this.medicalTableModel.sortDesc === asc) {
      this.medicalTableModel.sortBy = "";
    } else {
      this.medicalTableModel.sortDesc = asc;
    }
  }
}
