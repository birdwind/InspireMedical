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

export function deepCopy(obj: object): object {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" !== typeof obj) {
    return obj;
  }

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        // @ts-ignore
        copy[attr] = deepCopy(obj[attr]);
      }
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}
