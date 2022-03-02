import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";

@Component({
  components: {},
})
export default class Index extends BaseVue {
  private currentTab = 0;
  private copyRight = process.env.VUE_APP_CopyRight;
  private workId = "";

  mounted() {
    this.workId = this.$route.params.workId;
  }
}
