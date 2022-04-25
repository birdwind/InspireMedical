import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { MedicalTableModel } from "@/model/MedicalTableModel";
import { i18n } from "@/base/config";
import { Watch } from "vue-property-decorator";
import { MyLogger } from "@/base/utils/MyLogger";
import { PatientServer } from "@/server/PatientServer";

@Component({})
export default class PatientList extends BaseVue {
  private tableLoading = false;
  private medicalTableModel: MedicalTableModel = new MedicalTableModel();
  private selectedCondition = 0;

  private get questionListHeaderModel() {
    return [
      {
        text: i18n.t("patientManager.name"),
        value: "Name",
      },
      {
        text: i18n.t("patientManager.phone"),
        value: "Phone",
      },
      {
        text: i18n.t("patientManager.condition"),
        value: "ConditionName",
      },
      {
        text: i18n.t("patientManager.hasCaregiver"),
        value: "HasCaregiver",
      },
      {
        text: i18n.t("patientManager.comment"),
        value: "RequestCount",
      },
      {
        text: i18n.t("patientManager.currentSurvey"),
        value: "1",
      },
      {
        text: i18n.t("patientManager.response"),
        value: "2",
      },
      {
        text: i18n.t("patientManager.lastResponse"),
        value: "LastRequestTime",
      },
      {
        text: i18n.t("patientManager.created"),
        value: "CreatedTime",
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

  private get patientCSVName() {
    return new Date().getTime().toString();
  }

  private get conditionList() {
    return [
      { label: "All", value: 0 },
      { label: "Alzheimer", value: 1 },
      { label: "Parkinson", value: 2 },
      { label: "Migraine", value: 3 },
    ];
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

  @Watch("selectedCondition")
  private async watchSelectedCondition(newVal: number) {
    await this.updateQuestionList(newVal);
  }

  private async updateQuestionList(page: number) {
    await this.executeComponentAsync(
      async () => {
        await PatientServer.patientList(page - 1, this.selectedCondition).then((response) => {
          if (response) {
            response.PatientList.forEach((item: any) => {
              item.LastRequestTime = item.LastRequestTime ? new Date(item.LastRequestTime) : "--";
              item.CreatedTime = item.CreatedTime ? new Date(item.CreatedTime) : "--";
              // item.HasCaregiver = item.HasCaregiver === true ? "Yes" : "No";
            });

            this.medicalTableModel.data = response.PatientList;
            this.medicalTableModel.totalData = response.PatientCount;
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
