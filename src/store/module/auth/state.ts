export interface AuthState {
  isLogin: boolean;
  authorization: string | any;
  lang: string;
}

export const state: AuthState = {
  isLogin: false,
  authorization: "",
  lang: "",
};
