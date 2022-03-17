import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Action } from "vuex-class";
import { UpdateAnswerType, UpdateLang, UpdateTopic } from "@/store/types";
import { LocalesEnums } from "@/enums/LocalesEnums";
import { Watch } from "vue-property-decorator";
import { RouteRecord } from "vue-router";
import { QuestionServer } from "@/server/QuestionServer";

@Component({
  components: {},
})
export default class Index extends BaseVue {
  @Action("Auth/updateLang")
  private updateLang!: UpdateLang;
  @Action("Question/updateAnswerType")
  private updateAnswerType!: UpdateAnswerType;
  @Action("Question/updateTopic")
  private updateTopic!: UpdateTopic;

  private currentTab = 0;
  private copyRight = process.env.VUE_APP_CopyRight;
  private workId = "";

  @Watch("$route")
  private async watchRoute(newVal: any) {
    if (newVal.matched.filter((item: RouteRecord) => item.path === "/survey").length) {
      this.currentTab = 0;
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
      this.updateTopic(response.TopicList);
    });
  }

  private changeLang(data: string) {
    this.updateLang(data as LocalesEnums);
  }
}
