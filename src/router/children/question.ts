export const questionRoutes = [
  {
    path: "question",
    name: "QuestionList",
    component: () => import("@/views/Question/QuestionList/QuestionList.vue"),
  },
  {
    path: "question/:id",
    name: "QuestionDetail",
    component: () => import("@/views/Question/QuestionDetail/QuestionDetail.vue"),
  },
];
