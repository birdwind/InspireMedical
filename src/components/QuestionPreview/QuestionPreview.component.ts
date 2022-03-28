import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Prop } from "vue-property-decorator";
import QuestionDetailModel from "@/model/Question/QuestionDetailModel";

@Component({})
export default class QuestionPreviewComponent extends BaseVue {
  @Prop()
  private question!: QuestionDetailModel;

  private getPreviewAnswerArea(answerType: number) {
    return this.question.AnswerType === answerType;
  }
}
