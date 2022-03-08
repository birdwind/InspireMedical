import Vue from "vue";
import VueI18n from "vue-i18n";
import { LocalesEnums } from "@/enums/LocalesEnums";
import en from "@/i18n/en.json";
import tw from "@/i18n/tw.json";
import store from "@/store";

Vue.use(VueI18n);

let defaultLocale = store.getters["Auth/lang"];
if (!defaultLocale) {
  defaultLocale = LocalesEnums.EN;
}

export const messages = {
  [LocalesEnums.EN]: en,
  [LocalesEnums.TW]: tw,
};

export const i18n = new VueI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
});
