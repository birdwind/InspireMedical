import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { PatientServer } from "@/server/PatientServer";
import { Watch } from "vue-property-decorator";
import { MedicalTableModel } from "@/model/MedicalTableModel";
import { i18n } from "@/base/config";

@Component({})
export default class PatientInfo extends BaseVue {
  private id = 0;

  private patient = {};
  private patientMembers = {};

  private survetMedicalTableModel: MedicalTableModel = new MedicalTableModel();
  private questionnaireMedicalTableModel: MedicalTableModel = new MedicalTableModel();

  private get surveyListHeaderModel() {
    return [
      {
        text: i18n.t("patientManager.surveyName"),
        value: "SurveyName",
      },
      {
        text: i18n.t("patientManager.condition"),
        value: "ConditionName",
      },
      {
        text: i18n.t("patientManager.respondent"),
        value: "RespondentName",
      },
      {
        text: i18n.t("patientManager.schedule"),
        value: "ScheduleText",
      },
      {
        text: i18n.t("patientManager.request"),
        value: "RequestCount",
      },
      {
        text: i18n.t("patientManager.scheduleStatus"),
        value: "IsEnable",
      },
    ];
  }

  private get questionnaireListHeaderModel() {
    return [
      {
        text: i18n.t("patientManager.submitTime"),
        value: "SubmitTime",
      },
      {
        text: i18n.t("patientManager.surveyName"),
        value: "SurveyName",
      },
      {
        text: i18n.t("patientManager.condition"),
        value: "ConditionName",
      },
      {
        text: i18n.t("patientManager.respondent"),
        value: "RespondentName",
      },
      {
        text: i18n.t("patientManager.score"),
        value: "ScheduleText",
      },
      {
        text: i18n.t("patientManager.download"),
        value: "IsEnable",
      },
    ];
  }

  private async mounted() {
    this.id = Number(this.$route.params.id);
    await this.init();
  }

  @Watch("$route.params")
  private async watchParams(newVal: any) {
    this.id = newVal.id;
    await this.init();
  }

  private async init() {
    await this.executeAsync(async () => {
      await PatientServer.patientDetail(this.id).then((response) => {
        if (response) {
          this.patient = response.Patient;
          this.patientMembers = response.PatientMembers;
          this.survetMedicalTableModel.data = response.surveys;
          this.questionnaireMedicalTableModel.data = response.Questionnaires;
        }
      });
    });
  }

  private isNull(anything: any): string {
    if (anything == null) {
      return "";
    }
    return anything;
  }
}
