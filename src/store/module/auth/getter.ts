import { AuthState } from "@/store/module/auth/state";

export default {
  isLogin: (state: AuthState): boolean => state.isLogin,
  auth: (state: AuthState): any => state.authorization,
};
