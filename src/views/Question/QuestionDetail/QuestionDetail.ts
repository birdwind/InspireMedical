import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Watch } from "vue-property-decorator";
import { PatientConditionEnum } from "@/enums/PatientConditionEnum";
import { RespondentEnum } from "@/enums/RespondentEnum";
import { QuestionServer } from "@/server/QuestionServer";
import { MyLogger } from "@/base/utils/MyLogger";
import { Getter } from "vuex-class";
import Vuedraggable from "vuedraggable";

@Component({
  components: {
    Vuedraggable,
  },
})
export default class QuestionDetail extends BaseVue {
  @Getter("Question/answerType")
  private answerTypes!: any;
  @Getter("Question/topic")
  private topics!: any;

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
  private answerType = "";
  private questionTitle = "";
  private temp = [1, 2, 3];
  private tempIndex = -1;
  private topic = [];

  @Watch("$route.params")
  private async watchParams(newVal: any) {
    this.id = newVal.id;
    await this.init();
  }

  private async mounted() {
    await this.init();
  }

  private async init() {}

  private get dragOptions() {
    return {
      animation: 200,
      group: "answer",
      disabled: false,
      ghostClass: "ghost",
    };
  }

  private clickPatient(patientConditionEnum: PatientConditionEnum) {
    this.patientConditionValue = patientConditionEnum;
  }

  private clickRespondent(respondentEnum: RespondentEnum) {
    this.respondentValue = respondentEnum;
  }

  private handlerMove(evt: any, originalEvent: any) {
    MyLogger.log(evt);
  }

  private handlerEndDrag() {
    MyLogger.log("EndDrag");
  }
}
