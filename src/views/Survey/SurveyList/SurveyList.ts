import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { i18n } from "@/base/config";
import { MedicalTableModel } from "@/model/MedicalTableModel";
import { Watch } from "vue-property-decorator";
import { SurveyServer } from "@/server/SurveyServer";

@Component({})
export default class SurveyList extends BaseVue {
  private tableLoading = true;
  private medicalTableModel: MedicalTableModel = new MedicalTableModel();

  private get surveyListHeaderModel() {
    return [
      {
        text: i18n.t("survey.name"),
        value: "SurveyName",
      },
      {
        text: i18n.t("survey.created"),
        value: "NameC",
      },
      {
        text: i18n.t("survey.condition"),
        value: "ConditionName",
      },
      {
        text: i18n.t("survey.respondent"),
        value: "RespondentName",
      },
      {
        text: i18n.t("survey.questions"),
        value: "QuestionsCount",
      },
      {
        text: i18n.t("survey.createdDate"),
        value: "TimeC",
      },
      {
        text: i18n.t("survey.modifiedDate"),
        value: "TimeU",
      },
      {
        text: i18n.t("survey.prescription"),
        value: "PrescribedPatientCount",
      },
      {
        text: i18n.t("survey.default"),
        value: "default",
      },
    ];
  }

  async mounted() {
    await this.init();
  }

  /*
   * 監聽分頁
   */
  @Watch("medicalTableModel.options.page")
  private async watchMedicalTableModelOption(newVal: any) {
    await this.updateSurveyList(newVal);
  }

  private async init() {}

  /*
   * 更新表單列表
   */
  private async updateSurveyList(page: number) {
    await this.executeComponentAsync(
      async () => {
        await SurveyServer.surveyList(page - 1).then((response) => {
          if (response) {
            response.QuestionList.forEach((item: any) => {
              item.TimeC = item.TimeC ? new Date(item.TimeC) : "--";
              item.TimeU = item.TimeU ? new Date(item.TimeU) : "--";
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
