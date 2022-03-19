import { apiUtils } from "@/base/utils/ApiUtils";

export const QuestionServer = {
  async questionList(page: number): Promise<any> {
    try {
      return await apiUtils.get("/api/SurveyManagement/QuestionList", { params: { Page: page } });
    } catch (e) {}
  },
  async questionDetail(id: number): Promise<any> {
    try {
      return await apiUtils.get("/api/SurveyManagement/QuestionDetail", { params: { QuestionID: id } });
    } catch (e) {}
  },
  async answerType(): Promise<any> {
    return await apiUtils.get("/api/SurveyManagement/AnswerTypeList");
  },
  async questionTopic(): Promise<any> {
    return await apiUtils.get("/api/SurveyManagement/QuestionTopicList");
  },
  async uploadImage(formData: FormData): Promise<any> {
    return await apiUtils.post("/api/SurveyManagement/UploadMedia", formData);
  },
};
