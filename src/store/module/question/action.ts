import { QUESTION_UPDATE_ANSWER_TYPE, QUESTION_UPDATE_TOPIC } from "@/store/mutationConstant";

export default {
  updateAnswerType(context: any, data: any) {
    context.commit(QUESTION_UPDATE_ANSWER_TYPE, data);
  },
  updateTopic(context: any, data: any) {
    context.commit(QUESTION_UPDATE_TOPIC, data);
  },
};
