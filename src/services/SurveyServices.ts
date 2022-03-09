import { apiUtils } from "@/base/utils/ApiUtils";
import { MyLogger } from "@/base/utils/MyLogger";

export const SurveyServices = {
  async surveyList(page: number): Promise<any> {
    try {
      return await apiUtils.get("/api/SurveyManagement/SurveyList", { params: { Page: page } });
    } catch (e) {}
  },
};
