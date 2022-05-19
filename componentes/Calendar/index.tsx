import React from "react";
import { Button, Modal, SafeAreaView } from "react-native";
import {
  Calendar as CustomCalendar,
  LocaleConfig,
  CalendarProps,
} from "react-native-calendars";
import { generateInterval } from "./generateInterval";
import { ptBr } from "./locales";
import { Container } from "./styles";

LocaleConfig.locales["pt-br"] = ptBr;
LocaleConfig.defaultLocale = "pt-br";

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableToucheEvent?: boolean;
  };
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface Props extends CalendarProps {
  visible: boolean;
  onClose: () => void;
}

const Calendar = ({ markedDates, onDayPress, visible, onClose }: Props) => {
  return (
    <Modal visible={visible} style={{ marginTop: 50 }}>
      <SafeAreaView>
        <CustomCalendar
          firstDay={1}
          markedDates={markedDates}
          markingType="period"
          onDayPress={onDayPress}
        />
        <Button title="Fechar" onPress={onClose} />
      </SafeAreaView>
    </Modal>
  );
};

export { Calendar, MarkedDateProps, DayProps, generateInterval };
