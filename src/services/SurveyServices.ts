import { apiUtils } from "@/base/utils/ApiUtils";

export const SurveyServices = {
  async surveyList(page: number): Promise<any> {
    try {
      return await apiUtils.get("/api/SurveyManagement/SurveyList", { params: { Page: page } });
    } catch (e) {}
  },
  async surveyDetail(id: number): Promise<any> {
    try {
      return await apiUtils.get("/api/SurveyManagement/surveyDetail", { params: { SurveyID: id } });
    } catch (e) {}
  },
};
