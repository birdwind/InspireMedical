import Vue from "vue";
import { BaseVue } from "@/base/view/BaseVue";
import { ApiBadRequestError, ApiError, ApiUnauthorizedError } from "@/base/error/ApiErrorHandler";
import { BusinessError } from "@/base/error/BusinessError";
import { MessageType } from "element-ui/types/message";
import { NotificationPosition } from "element-ui/types/notification";

interface IAllError extends Error {
  config: any;
  code: any;
  request: XMLHttpRequest;
  response: {
    config: any;
    status: number;
  };
}

function findComponentBaseVue(vm: Vue): BaseVue {
  if (vm instanceof BaseVue) {
    return vm as BaseVue;
  }

  return findComponentBaseVue(vm.$parent);
}

function safeShowWarning(vm: BaseVue, message: string, title?: string) {
  if (vm && typeof vm.showWarning === "function") {
    vm.showWarning(message, title);
  }
  if (vm && typeof vm.addHistoryMessage === "function") {
    const now = new Date();
    vm.addHistoryMessage({
      id: now.getTime(),
      code: title,
      message,
      occurAt: now,
    });
  }

  console.warn(message);
}
function safeShowError(vm: BaseVue, message: string, ex?: Error) {
  if (vm && typeof vm.showError === "function") {
    vm.showError(message, "非預期錯誤");
  }

  if (vm && typeof vm.addHistoryMessage === "function") {
    const now = new Date();
    vm.addHistoryMessage({
      id: now.getTime(),
      message,
      occurAt: now,
      stacktrace: ex?.stack?.toString(),
    });
  }
  console.error(ex);
}

function showMessage(type: MessageType, msg: string, title: string = "訊息") {
  const data = {
    type: type as MessageType,
    title,
    message: msg,
    position: "bottom-right" as NotificationPosition,
  };

  Vue.prototype.$notify(data);
}

export function configErrorHandler(): void {
  Vue.config.errorHandler = (err: IAllError, vm: Vue) => {
    const myCpn = findComponentBaseVue(vm);
    //
    if (err instanceof BusinessError) {
      //
      const bex = err as BusinessError;
      safeShowWarning(myCpn, bex.message);
    } else if (err instanceof ApiBadRequestError) {
      //
      const apiError = err as ApiBadRequestError;

      safeShowWarning(myCpn, apiError.message, apiError.code);
    } else if (err instanceof ApiUnauthorizedError) {
      const apiError = err as ApiUnauthorizedError;
      safeShowWarning(myCpn, apiError.message, apiError.code);
    } else {
      safeShowError(myCpn, err.message, err);
    }
    if (myCpn && typeof myCpn.stopLoading === "function") {
      myCpn.stopLoading();
    }
  };
}

export function customerErrorHandler(err: Error): void {
  if (err instanceof BusinessError) {
    const bex = err as BusinessError;
    showMessage("warning", bex.message);
  } else if (err instanceof ApiBadRequestError) {
    const apiError = err as ApiBadRequestError;
    showMessage("warning", apiError.message, apiError.code);
  } else if (err instanceof ApiUnauthorizedError) {
    const apiError = err as ApiUnauthorizedError;
    showMessage("warning", apiError.message, apiError.code);
  } else if (err instanceof ApiError) {
    const apiError = err as ApiError;
    showMessage("warning", apiError.message, apiError.code);
  } else {
    // safeShowError(myCpn, err.message, err);
  }
}
