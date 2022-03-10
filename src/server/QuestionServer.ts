import { apiUtils } from "@/base/utils/ApiUtils";

export const QuestionServer = {
  async questionList(page: number): Promise<any> {
    try {
      return await apiUtils.get("/api/SurveyManagement/QuestionList", { params: { Page: page } });
    } catch (e) {}
  },
  async questionDetail(id: number): Promise<any> {
    try {
      return await apiUtils.get("/api/SurveyManagement/QuestionDetail", { params: { SurveyID: id } });
    } catch (e) {}
  },
};
