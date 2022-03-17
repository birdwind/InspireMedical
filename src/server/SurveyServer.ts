import { apiUtils } from "@/base/utils/ApiUtils";
import { SurveyDetailModel } from "@/model/Survey/SurveyDetailModel";

export const SurveyServer = {
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
  async availableQuestions(respondent: number, condition: number): Promise<any> {
    try {
      return await apiUtils.get("/api/SurveyManagement/AvailableQuestions", {
        params: {
          Condition: condition,
          Respondent: respondent,
        },
      });
    } catch (e) {}
  },
  async saveSurvey(surveyDetailModel: SurveyDetailModel): Promise<any> {
    try {
      if (surveyDetailModel.SurveyID === 0) {
        return await apiUtils.post("/api/SurveyManagement/AddSurvey", JSON.stringify(surveyDetailModel), {});
      } else {
        return await apiUtils.patch("/api/SurveyManagement/EditSurvey", JSON.stringify(surveyDetailModel), {});
      }
    } catch (e) {}
  },
};
