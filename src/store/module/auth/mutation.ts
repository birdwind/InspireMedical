import * as types from "@/store/mutationConstant";
import { AuthState } from "@/store/module/auth/state";
import { LocalesEnums } from "@/enums/LocalesEnums";
import { i18n } from "@/base/config";

export default {
  [types.AUTH_UPDATE_LANG](state: AuthState, localesEnums: LocalesEnums): void {
    i18n.locale = localesEnums;
  },
  [types.AUTH_LOGIN](state: AuthState, isLogin: boolean): void {
    state.isLogin = isLogin;
  },
};
