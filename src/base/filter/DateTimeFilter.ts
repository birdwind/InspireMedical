import dayjs from "dayjs";

export function ToDateMonth(dateString: Date): string {
  const target = dayjs(dateString).format("YYYY.MM.DD").replace("週", "");

  if (target.trim().toLowerCase() === "Invalid Date".toLowerCase()) {
    return "N/A";
  }
  return target;
}
