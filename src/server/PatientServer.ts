import { apiUtils } from "@/base/utils/ApiUtils";

export const PatientServer = {
  async patientList(page: number, condition: number): Promise<any> {
    try {
      return await apiUtils.get("/api/PatientManagement/PatientList", {
        params: {
          Page: page,
          Condition: condition,
        },
      });
    } catch (e) {}
  },
  async patientDetail(id: number): Promise<any> {
    try {
      return await apiUtils.get("/api/PatientManagement/PatientDetail", { params: { PID: id } });
    } catch (e) {}
  },
};
