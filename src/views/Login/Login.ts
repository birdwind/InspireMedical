import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Action } from "vuex-class";
import { LoginServer } from "@/store/types";

@Component({})
export default class Login extends BaseVue {
  @Action("Auth/loginServer")
  private login!: LoginServer;

  mounted() {}
}
