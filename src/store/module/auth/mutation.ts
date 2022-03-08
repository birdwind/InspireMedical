import * as types from "@/store/mutationConstant";
import { AuthState } from "@/store/module/auth/state";
import { LocalesEnums } from "@/enums/LocalesEnums";
import { i18n } from "@/base/config";

export default {
  [types.AUTH_UPDATE_LANG](state: AuthState, localesEnums: LocalesEnums): void {
    state.lang = localesEnums;
    i18n.locale = state.lang;
  },
  [types.AUTH_LOGIN](state: AuthState, data: any): void {
    state.authorization = data;
    if (data) {
      state.isLogin = true;
    }
  },
};
