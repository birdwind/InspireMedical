import { apiUtils } from "@/base/utils/ApiUtils";
import { SurveyDetailModel } from "@/model/Survey/SurveyDetailModel";
import { MyLogger } from "@/base/utils/MyLogger";
import QuestionDetailModel from "@/model/Question/QuestionDetailModel";

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
      const data = JSON.parse(JSON.stringify(surveyDetailModel));
      data.Questions = data.Questions.map((item: QuestionDetailModel) => item.QuestionID);
      MyLogger.log(data);
      if (surveyDetailModel.isCreate()) {
        return await apiUtils.post("/api/SurveyManagement/AddSurvey", data, {});
      } else {
        return await apiUtils.patch("/api/SurveyManagement/EditSurvey", data, {});
      }
    } catch (e) {}
  },
};
