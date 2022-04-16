import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Action, Getter } from "vuex-class";
import { Logout, UpdateAnswerType, UpdateLang, UpdateTopic } from "@/store/types";
import { LocalesEnums } from "@/enums/LocalesEnums";
import { Watch } from "vue-property-decorator";
import { RouteRecord } from "vue-router";
import { QuestionServer } from "@/server/QuestionServer";
import TopicModel from "@/model/Question/TopicModel";
import { SurveyServer } from "@/server/SurveyServer";
import { LoginServer } from "@/server/LoginServer";
import { ModifyPasswordModel } from "@/model/ModifyPasswordModel";

@Component({
  components: {},
})
export default class Index extends BaseVue {
  @Action("Auth/logout")
  private logout!: Logout;
  @Action("Auth/updateLang")
  private updateLang!: UpdateLang;
  @Action("Question/updateAnswerType")
  private updateAnswerType!: UpdateAnswerType;
  @Action("Question/updateTopic")
  private updateTopic!: UpdateTopic;
  @Getter("Auth/auth")
  private auth!: any;
  @Getter("Auth/lang")
  private lang!: any;

  private currentTab = 0;
  private copyRight = process.env.VUE_APP_CopyRight;
  private workId = "";
  private isShowModifyPassword = false;
  private modifyPasswordModel: ModifyPasswordModel = new ModifyPasswordModel();

  private get Lang() {
    switch (this.lang) {
      case "en":
        return "English";
      case "zh_TW":
        return "中文";
      default:
        return "English";
    }
  }

  @Watch("$route")
  private async watchRoute(newVal: any) {
    if (newVal.matched.filter((item: RouteRecord) => item.path === "/patient").length) {
      this.currentTab = 0;
    }
  }

  @Watch("isShowModifyPassword")
  private watchIsShowModifyPassword(newVal: boolean) {
    if (!newVal) {
      this.modifyPasswordModel = new ModifyPasswordModel();
    }
  }

  private async mounted() {
    await this.init();
  }

  private async init() {
    this.workId = this.$route.params.workId;
    await QuestionServer.answerType().then((response) => {
      this.updateAnswerType(response);
    });
    await QuestionServer.questionTopic().then((response) => {
      const topicModels: TopicModel[] = [];
      response.TopicList.forEach((item: string) => {
        topicModels.push(new TopicModel().parse(item));
      });
      this.updateTopic(topicModels);
    });
  }

  private changeLang(data: string) {
    this.updateLang(data as LocalesEnums);
  }

  private showModifyPassword(isShow: boolean = true) {
    this.isShowModifyPassword = isShow;
  }

  private async saveModifyPassword() {
    await this.executeAsync(async () => {
      await LoginServer.changePassword(this.modifyPasswordModel)
        .then((response) => {
          this.showModifyPassword(false);
        })
        .catch((error) => {
          this.modifyPasswordModel = new ModifyPasswordModel();
        });
    });
  }
}
