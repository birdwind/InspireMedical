import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Watch } from "vue-property-decorator";
import { PatientConditionEnum } from "@/enums/PatientConditionEnum";
import { RespondentEnum } from "@/enums/RespondentEnum";
import { QuestionServer } from "@/server/QuestionServer";
import { MyLogger } from "@/base/utils/MyLogger";
import { Getter } from "vuex-class";
import Vuedraggable from "vuedraggable";
import QuestionDetailModel from "@/model/Question/QuestionDetailModel";
import UploadImageModel from "@/model/UploadImageModel";

@Component({
  components: {
    Vuedraggable,
  },
})
export default class QuestionDetail extends BaseVue {
  $refs!: {
    question_image: any;
  };
  @Getter("Question/answerType")
  private answerTypes!: any;
  @Getter("Question/topic")
  private topics!: any;
  @Getter("Auth/auth")
  private auth!: any;

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
  private questionDetailModel = new QuestionDetailModel();
  private uploadImageModel = new UploadImageModel();

  get serverHeader() {
    return { Token: this.auth ? this.auth.LoginKey : "0000" };
  }

  @Watch("$route.params")
  private async watchParams(newVal: any) {
    this.id = newVal.id;
    await this.init();
  }

  private async mounted() {
    this.id = Number(this.$route.params.id);
    await this.init();
  }

  private async init() {
    if (this.id === 0) {
      this.questionDetailModel = new QuestionDetailModel();
    } else {
      await this.executeAsync(async () => {
        await QuestionServer.questionDetail(this.id).then((response) => {
          this.questionDetailModel = new QuestionDetailModel().json(response);
        });
      });
      MyLogger.log(this.questionDetailModel);
    }
  }

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

  private beforeUploadQuestionImage(file: any) {
    // MyLogger.log(this.$refs.question_image);
    // const formData = new FormData();
    // formData.append("file", file);
    // QuestionServer.uploadImage(formData).then((response) => {
    //   this.questionDetailModel.MediaLink = response.MediaLink;
    //   this.$refs.question_image
    // });
    // return false;
  }

  private handlerQuestionImageChange(file: any) {
    // MyLogger.log(file);
    // const formData = new FormData();
    // formData.append("file", file);
    // QuestionServer.uploadImage(formData).then((response) => {
    //   this.questionDetailModel.MediaLink = response.MediaLink;
    //   this.$refs.question_image
    // });
    // return false;
  }

  private handleQuestionImageSuccess() {
    if (this.$refs.question_image.uploadFiles) {
      this.questionDetailModel.MediaLink = this.$refs.question_image.uploadFiles[0].response.JsonData.MadiaLink;
    }
  }

  private handlerQuestionImageError() {
    MyLogger.log("456");
  }
  private handlePictureCardPreview(file: any) {
    this.uploadImageModel.dialogImageUrl = file.url;
    this.uploadImageModel.dialogVisible = true;
  }
  private handleDownload(file: any) {}

  private handleRemove(file: any) {
    this.$refs.question_image.uploadFiles = this.$refs.question_image.uploadFiles.filter((item: any) => {
      return item.uid !== file.uid;
    });
    this.questionDetailModel.MediaLink = "";
  }
}
