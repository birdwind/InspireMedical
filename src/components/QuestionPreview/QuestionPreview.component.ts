import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Prop } from "vue-property-decorator";
import QuestionDetailModel from "@/model/Question/QuestionDetailModel";
import { i18n } from "@/base/config";
import { MyLogger } from "@/base/utils/MyLogger";

@Component({})
export default class QuestionPreviewComponent extends BaseVue {
  @Prop()
  private question!: QuestionDetailModel;
  private marks: any = {
    0: "0",
    100: "100",
  };

  private sliderValue: {} = {};
  private sliderValueOriginal: {} = {};

  private maxSlider: number = 100;

  private getPreviewAnswerArea(answerType: number) {
    return this.question.AnswerType === answerType;
  }

  private getTotalSlider() {
    return i18n.t("question.totalScore").toString().replace("${score}", String(this.maxSlider));
  }
}
