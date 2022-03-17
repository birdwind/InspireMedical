import { QuestionState } from "@/store/module/question/state";

export default {
  answerType: (state: QuestionState): any[] => state.answerType,
  topic: (state: QuestionState): any[] => state.topic,
};
