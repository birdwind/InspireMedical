import { AUTH_LOGIN, AUTH_UPDATE_LANG } from "@/store/mutationConstant";
import { LocalesEnums } from "@/enums/LocalesEnums";
import { LoginService } from "@/services/LoginService";
import { MyLogger } from "@/base/utils/MyLogger";

export default {
  updateLang(context: any, localesEnums: LocalesEnums) {
    context.commit(AUTH_UPDATE_LANG, localesEnums);
  },
  async loginServer(context: any, data: any): Promise<void> {
    try {
      const userName = data.account;
      const password = data.password;

      const authResponse = await LoginService.login({ Phone: userName, Password: password });

      // Check Login Data Same as System
      await context.commit(AUTH_LOGIN, authResponse);
    } catch (error) {
      await Promise.reject(error);
    }
  },
  async logout(context: any): Promise<void> {
    try {
      await context.commit(AUTH_LOGIN, null);
    } catch (error) {
      // skip
    }
  },
  async updateAuthorization(context: any, data: any): Promise<void> {
    context.commit(AUTH_LOGIN, data);
  },
};
