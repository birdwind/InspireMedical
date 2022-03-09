import dayjs from "dayjs";

const timezoneOffset = dayjs().utcOffset(); // 以 Taipei 時間來說，此值會為 480

export enum DiffRange {
  year = "years",
  month = "months",
  day = "days",
  hour = "hours",
  minute = "minutes",
  second = "second",
}

export function getDayOfWeek(value: Date, locale: string = "zh-TW"): string {
  if (locale === "zh-TW") {
    const words = ["日", "一", "二", "三", "四", "五", "六"];
    return words[value.getDay()];
  }

  return value.toString();
}

export function DateFormat(value: Date, format: string, locate: string = "zh-TW") {
  const target = dayjs(value).format(format).replace("週", "");

  if (target.trim().toLowerCase() === "Invalid Date".toLowerCase()) {
    return "N/A";
  }
  return target;
}

export function ParseToDateByFormat(value: string, format: string, locate: string = "zh-TW") {
  return dayjs(value, format).toDate();
}

export function DateFormatToUTC(value: string) {
  return dayjs(value).add(timezoneOffset, "minute");
}
