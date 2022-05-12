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
import QuestionChoicesModel from "@/model/Question/QuestionChoicesModel";
import QuestionPreviewComponent from "@/components/QuestionPreview/QuestionPreview.component.vue";
import TopicModel from "@/model/Question/TopicModel";
import { deepCopy, simplyComparison } from "@/utils/ObjectUtils";

@Component({
  components: {
    Vuedraggable,
    QuestionPreviewComponent,
  },
})
export default class QuestionDetail extends BaseVue {
  @Getter("Question/answerType")
  private answerTypes!: any;

  @Getter("Question/topic")
  private topics!: TopicModel[];

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
  private questionDetailModel = new QuestionDetailModel();
  private questionDetailModelTemp = new QuestionDetailModel();
  private questionChoicesModelTemp: QuestionChoicesModel[] = [];
  private choiceTempCount = 0;
  private uploadImageModel = new UploadImageModel();
  private questionChoicesItem = new QuestionChoicesModel();

  $refs!: any;

  private get serverHeader() {
    return { Token: this.auth ? this.auth.LoginKey : "0000" };
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
    if (!simplyComparison(this.questionDetailModel, this.questionDetailModelTemp)) {
      return false;
    } else {
      if (this.questionDetailModel.Choices.length === this.questionChoicesModelTemp.length) {
        let isSame = true;
        this.questionDetailModel.Choices.forEach((item, index) => {
          if (isSame) {
            if (
              this.questionChoicesModelTemp[index].ChoiceID !== item.ChoiceID ||
              this.questionChoicesModelTemp[index].MediaLink !== item.MediaLink
            ) {
              isSame = false;
            }
          }
        });
        return isSame;
      }
      return false;
    }
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
          // response.Choices = response.Choices.reverse();
          this.questionDetailModel = new QuestionDetailModel().json(response);
        });
      });
      this.cloneModel();
    }
  }

  private cloneModel() {
    this.questionDetailModelTemp = Object.assign({}, this.questionDetailModel);
    this.questionChoicesModelTemp = [];
    this.questionDetailModel.Choices.forEach((item) => {
      this.questionChoicesModelTemp.push(Object.assign({}, item));
    });
    this.choiceTempCount = this.questionDetailModel.Choices.length;
  }

  private clickPatient(patientConditionEnum: PatientConditionEnum) {
    if (this.questionDetailModel.isCreate()) {
      this.questionDetailModel.ConditionID = patientConditionEnum;
    }
  }

  private clickRespondent(respondentEnum: RespondentEnum) {
    if (this.questionDetailModel.isCreate()) {
      this.questionDetailModel.RespondentType = respondentEnum;
    }
  }

  private beforeUploadQuestionImage(file: any) {
    this.showLoading(true);
  }

  private handleQuestionImageSuccess(response: any) {
    if (this.$refs.question_image.uploadFiles) {
      this.questionDetailModel.MediaLink = response.JsonData.MediaLink;
    }
    this.showLoading(false);
  }

  private handleChoiceImageSuccess(response: any) {
    if (this.$refs.choice_image.uploadFiles) {
      this.questionChoicesItem.MediaLink = response.JsonData.MediaLink;
    }
    this.showLoading(false);
  }

  private handlerQuestionImageError() {
    this.showLoading(false);
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

  private handlePictureCardPreview(fileUrl: string) {
    this.uploadImageModel.dialogImageUrl = fileUrl;
    this.uploadImageModel.dialogVisible = true;
  }

  private handleRemove(imageTarget: string) {
    switch (imageTarget) {
      case "question":
        this.questionDetailModel.MediaLink = "";
        break;
      case "choice":
        this.questionChoicesItem.MediaLink = "";
        break;
    }
  }

  private getPreviewAnswerArea(answerType: number) {
    return this.questionDetailModel.AnswerType === answerType;
  }

  private handlerMove(evt: any, originalEvent: any) {}

  private handlerEndDrag(evt: any) {}

  private addAnswerChoice() {
    this.questionDetailModel.Choices.push(this.questionChoicesItem);
    this.questionChoicesItem = new QuestionChoicesModel();
  }

  private removeSelectedChoice(questionChoicesModel: QuestionChoicesModel) {
    this.questionDetailModel.Choices = this.questionDetailModel.Choices.filter((item) => {
      return item !== questionChoicesModel;
    });
  }

  private async save() {
    this.$refs.form.validate().then(async (success) => {
      if (success) {
        await this.executeAsync(async () => {
          await QuestionServer.save(this.questionDetailModel).then((response) => {
            if (this.questionDetailModel.isCreate()) {
              this.routerLink(`/question`);
            } else {
              this.reloadPage();
              this.cloneModel();
            }
          });
        });
      }
    });
  }

  private clickUploadChoiceImage(choiceID: string) {
    this.$refs[`file_${choiceID}`][0].click();
  }

  private async handlerUploadChoiceImage(event: any, item: any) {
    const formData = new FormData();
    formData.set("file", event.target.files[0]);
    await this.executeAsync(async () => {
      await QuestionServer.uploadImage(formData).then((response) => {
        item.MediaLink = response.MediaLink;
      });
    });
  }

  private currentReload() {
    if (this.id === 0) {
      this.$router.go(-1);
    } else {
      this.reloadPage();
    }
  }
}
