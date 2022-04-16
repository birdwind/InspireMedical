import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { MedicalTableModel } from "@/model/MedicalTableModel";
import { i18n } from "@/base/config";
import { Watch } from "vue-property-decorator";
import { MyLogger } from "@/base/utils/MyLogger";

@Component({})
export default class PatientList extends BaseVue {
  private tableLoading = false;
  private medicalTableModel: MedicalTableModel = new MedicalTableModel();

  private get questionListHeaderModel() {
    return [
      {
        text: i18n.t("patientManager.name"),
        value: "QuestionText",
      },
      {
        text: i18n.t("patientManager.phone"),
        value: "QuestionText",
      },
      {
        text: i18n.t("patientManager.condition"),
        value: "QuestionText",
      },
      {
        text: i18n.t("patientManager.hasCaregiver"),
        value: "QuestionText",
      },
      {
        text: i18n.t("patientManager.comment"),
        value: "QuestionText",
      },
      {
        text: i18n.t("patientManager.currentSurvey"),
        value: "QuestionText",
      },
      {
        text: i18n.t("patientManager.response"),
        value: "QuestionText",
      },
      {
        text: i18n.t("patientManager.lastResponse"),
        value: "QuestionText",
      },
      {
        text: i18n.t("patientManager.created"),
        value: "QuestionText",
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

  mounted() {}

  /*
   * 監聽分頁
   */
  @Watch("medicalTableModel.options.page")
  private async watchMedicalTableModelOption(newVal: any) {
    MyLogger.log(newVal);
    await this.updateQuestionList(newVal);
  }

  private async updateQuestionList(page: number) {
    // await this.executeComponentAsync(
    //     async () => {
    //       await QuestionServer.questionList(page - 1).then((response) => {
    //         if (response) {
    //           response.QuestionList.forEach((item: any) => {
    //             item.TimeC = item.TimeC ? new Date(item.TimeC) : "--";
    //             item.TimeU = item.TimeU ? new Date(item.TimeU) : "--";
    //             item.AnswerTypeText = this.answerTypes
    //                 .filter((type: any) => {
    //                   return type.AnswerTypeID === item.AnswerType;
    //                 })
    //                 .map((type: any) => type.AnswerType)[0];
    //             item.RespondentTypeText = this.respondentList
    //                 .filter((respondent) => {
    //                   return respondent.value === item.RespondentType;
    //                 })
    //                 .map((respondent) => respondent.text)[0];
    //             item.ConditionText = this.patientConditionList
    //                 .filter((condition) => {
    //                   return condition.value === item.ConditionID;
    //                 })
    //                 .map((respondent) => respondent.text)[0];
    //           });
    //           this.medicalTableModel.data = response.QuestionList;
    //           this.medicalTableModel.totalData = response.QuestionCount;
    //         }
    //       });
    //     },
    //     (isShowLoading) => (this.tableLoading = isShowLoading)
    // );
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
