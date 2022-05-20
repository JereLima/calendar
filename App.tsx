import { setDate } from "date-fns";
import { format } from "date-fns/esm";
import React, { useCallback, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from "./componentes/Calendar";

export default function App() {
  const [isVisibleCalendar, setIsVisibleCalendar] = useState(false);
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [dates, setDates] = useState<any[]>([]);

  const handleChangeDate = (date: DayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);
  };

  const handleCloseCalendar = () => {
    setIsVisibleCalendar(false);
    itemInArray();
  };

  const handleOpenCalendar = () => {
    setIsVisibleCalendar(true);
  };

  const itemInArray = useCallback(() => {
    const newArray = [];
    Object.keys(markedDates).map((item) => {
      newArray.push(format(new Date(item), 'dd/MM'));
    });
    setDates(newArray);
  }, [markedDates]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        {dates[0]} e {dates[dates.length - 1]}
      </Text>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleChangeDate}
        visible={isVisibleCalendar}
        onClose={handleCloseCalendar}
      />
      <Button title="Ver Calendário" onPress={handleOpenCalendar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
