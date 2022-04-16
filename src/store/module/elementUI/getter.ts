import { ElementUIVuex } from "@/store/module/elementUI/state";

export default {
  isLoading: (state: ElementUIVuex): boolean => state.isLoading,
  isReload: (state: ElementUIVuex): boolean => state.isReload,
};
