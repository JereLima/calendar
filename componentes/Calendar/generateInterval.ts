import { eachDayOfInterval, format, addDays } from "date-fns";
import { Platform } from "react-native";
import { MarkedDateProps, DayProps } from ".";

function getPlatformDate(date: Date) {
  if (Platform.OS === "ios") {
    return addDays(date, 1);
  } else {
    date;
  }
}

function generateInterval(start: DayProps, end: DayProps) {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach((item) => {
    const date = format(getPlatformDate(item), "yyyy-MM-dd");

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date ? "pink" : "green",

        textColor:
          start.dateString === date || end.dateString === date ? "green" : "pink",
      },
    };
  });

  return interval;
}

export { getPlatformDate, generateInterval };
