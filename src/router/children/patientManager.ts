export const patientManagerRoutes = [
  {
    path: "/patient",
    alias: ["/"],
    name: "PatientList",
    component: () => import("@/views/PatientManager/PatientList/PatientList.vue"),
  },
  {
    path: "/patient/:id",
    name: "PatientDetail",
    component: () => import("@/views/PatientManager/PatientInfo/PatientInfo.vue"),
  },
];
