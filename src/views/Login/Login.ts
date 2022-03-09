import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Action } from "vuex-class";
import { LoginServer } from "@/store/types";
import { MyLogger } from "@/base/utils/MyLogger";

@Component({})
export default class Login extends BaseVue {
  private username = "0981222612";
  private password = "10101010";

  @Action("Auth/loginServer")
  private loginServer!: LoginServer;

  $refs!: {
    form: any;
  };

  mounted() {}

  private async login() {
    await this.executeAsync(async () => {
      await this.loginServer({
        account: this.username,
        password: this.password,
      }).catch((e) => {
        MyLogger.log("123", e);
        if (e.indexOf("帳號") !== -1) {
          this.$refs.form.setErrors({ "login.email": [e] });
        }
        if (e.indexOf("密碼") !== -1) {
          this.$refs.form.setErrors({ "login.password": [e] });
        }
      });
    });
  }
}
