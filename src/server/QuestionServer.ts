import { apiUtils } from "@/base/utils/ApiUtils";
import QuestionDetailModel from "@/model/Question/QuestionDetailModel";
import QuestionChoicesModel from "@/model/Question/QuestionChoicesModel";
import { MyLogger } from "@/base/utils/MyLogger";

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
    return await apiUtils.post("/api/SurveyManagement/UploadMedia", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async save(questionDetailModel: QuestionDetailModel): Promise<any> {
    const data = JSON.parse(JSON.stringify(questionDetailModel));
    data.TimeC = new Date();
    data.TimeU = new Date();
    data.Choices.map((item: QuestionChoicesModel) => (item.ChoiceID = 0));
    if (questionDetailModel.isCreate()) {
      return await apiUtils.post("/api/SurveyManagement/AddQuestion", data, {});
    } else {
      return await apiUtils.patch("/api/SurveyManagement/EditQuestion", data, {});
    }
  },
};
