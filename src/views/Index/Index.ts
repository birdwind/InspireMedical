import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Action } from "vuex-class";
import { UpdateLang } from "@/store/types";
import { LocalesEnums } from "@/enums/LocalesEnums";

@Component({
  components: {},
})
export default class Index extends BaseVue {
  @Action("Auth/updateLang")
  private updateLang!: UpdateLang;

  private currentTab = 0;
  private copyRight = process.env.VUE_APP_CopyRight;
  private workId = "";

  mounted() {
    this.workId = this.$route.params.workId;
  }

  private changeLang(data: string) {
    this.updateLang(data as LocalesEnums);
  }
}
