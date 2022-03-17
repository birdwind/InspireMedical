import * as types from "@/store/mutationConstant";
import { QuestionState } from "@/store/module/question/state";

export default {
  [types.QUESTION_UPDATE_ANSWER_TYPE](state: QuestionState, data: any): void {
    data.forEach((item: any) => {
      item.AnswerType = `question.types.${item.AnswerType}`;
    });
    state.answerType = data;
  },
  [types.QUESTION_UPDATE_TOPIC](state: QuestionState, data: any): void {
    state.topic = data;
  },
};
