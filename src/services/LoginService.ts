import { apiUtils } from "@/base/utils/ApiUtils";
import store from "@/store";

export const LoginService = {
  async login(data: any): Promise<any> {
    try {
      return await apiUtils.post("/api/api/Login/WebLogin", JSON.stringify(data), {});
    } catch (e) {
      if (e.indexOf("金鑰失效") !== -1) {
        await store.dispatch("Auth/updateAuthorization", null);
      }
      await Promise.reject(e);
    }
  },
};
