import Vue from "vue";
import { configure, extend, ValidationObserver, ValidationProvider } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { i18n } from "@/base/config/configI18n";

export function configVeeValidate() {
  extend("phoneTW", {
    validate: (value) => {
      return value.match("(?=(09))[0-9]{10}");
    },
    message: (field, values) => i18n.t("validation.phoneTW").toString(),
  });

  for (const [rule, validation] of Object.entries(rules)) {
    extend(rule, {
      ...validation,
    });
  }

  // extend("required", {
  //   // 這邊可以改寫我們 email 告知使用者是必填欄位的提示文字
  //   ...required,
  //   message: (field, values) => i18n.t("validation.required").toString(),
  // });

  configure({
    classes: {
      valid: "",
      invalid: "medical-input-error",
    },
    defaultMessage: (field, values) => {
      if (field === "{field}") {
        values._field_ = "";
      } else {
        values._field_ = i18n.t(`${field}`);
      }
      return i18n.t(`validation.${values._rule_}`).toString().replace("${field}", values._field_);
    },
  });

  Vue.component("ValidationObserver", ValidationObserver);
  Vue.component("ValidationProvider", ValidationProvider);
}
