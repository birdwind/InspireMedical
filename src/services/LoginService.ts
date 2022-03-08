import { apiUtils } from "@/base/utils/ApiUtils";

export const LoginService = {
  async login(data: any): Promise<any> {
    try {
      return await apiUtils.post("/api/Login/WebLogin", {}, { params: data });
    } catch (e) {}
  },
};
