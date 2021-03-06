export const surveyRoutes = [
  {
    path: "/survey",
    name: "SurveyList",
    component: () => import("@/views/Survey/SurveyList/SurveyList.vue"),
  },
  {
    path: "/survey/:id",
    name: "SurveyDetail",
    component: () => import("@/views/Survey/SurveyDetail/SurveyDetail.vue"),
  },
];
