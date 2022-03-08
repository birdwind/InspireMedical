import Vue from "vue";
import VueI18n from "vue-i18n";
import { LocalesEnums } from "@/enums/LocalesEnums";
import en from "@/i18n/en.json";
import tw from "@/i18n/tw.json";

Vue.use(VueI18n);

export const messages = {
  [LocalesEnums.EN]: en,
  [LocalesEnums.TW]: tw,
};

export const defaultLocale = LocalesEnums.EN;

export const i18n = new VueI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
});
