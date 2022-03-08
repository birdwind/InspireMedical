export const surveyRoutes = [
  {
    path: "/survey",
    alias: [""],
    name: "SurveyList",
    component: () => import("@/views/Survey/SurveyList/SurveyList.vue"),
  },
];
