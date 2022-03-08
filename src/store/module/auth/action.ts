import { MyLogger } from "@/base/utils/MyLogger";
import { AUTH_LOGIN, AUTH_UPDATE_LANG, UI_HISTORY_MESSAGE } from "@/store/mutationConstant";
import { LocalesEnums } from "@/enums/LocalesEnums";
import { LoginService } from "@/services/LoginService";

export default {
  updateLang(context: any, localesEnums: LocalesEnums) {
    context.commit(AUTH_UPDATE_LANG, localesEnums);
  },
  async loginServer(context: any, data: any): Promise<void> {
    try {
      const userName = data.account;
      const password = data.password;

      const authResponse = await LoginService.login({ Phone: "0981222612", Password: "10101010" });

      // Check Login Data Same as System
      await context.commit(AUTH_LOGIN, authResponse);
    } catch (error) {
      MyLogger.log("Login Failed");
    }
  },
  async logout(context: any): Promise<void> {
    try {
      //
    } catch (error) {
      // skip
    }
    //
    // await this.dispatch(`${AppModuleConstant.appStore}/${AppStoreActionConstant.setUserProfile}`, {});
  },
};
