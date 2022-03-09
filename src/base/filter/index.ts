import { ToDateMonth } from "./DateTimeFilter";
import Vue from "vue";

export default function () {
  Vue.filter("ToDateMonth", ToDateMonth);
}
