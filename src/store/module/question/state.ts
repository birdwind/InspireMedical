import TopicModel from "@/model/Question/TopicModel";

export interface QuestionState {
  answerType: any[];
  topic: TopicModel[];
}

export const state: QuestionState = {
  topic: [],
  answerType: [],
};
