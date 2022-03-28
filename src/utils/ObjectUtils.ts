import { MyLogger } from "@/base/utils/MyLogger";

export function simplyComparison(oldVal: object, newVal: object) {
  let isCompare = true;
  Object.keys(newVal).forEach((property) => {
    // @ts-ignore
    // if (typeof oldVal[property] === "object" && typeof oldVal[property] !== "undefined") {
    //   // @ts-ignore
    //   isCompare = simplyComparison(oldVal[property], newVal[property]);
    // }
    // @ts-ignore
    if (oldVal[property] !== newVal[property]) {
      isCompare = false;
    }
    if (!isCompare) {
      return;
    }
  });
  return isCompare;
}
