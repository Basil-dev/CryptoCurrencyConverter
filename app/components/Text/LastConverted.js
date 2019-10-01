import React from "react";
import { Text } from "react-native";
import moment from "moment";

import styles from "./styles";

const LastConverted = ({ base, quote, conversionRate, date, language }) => {
  if (language === "Russian") {
    return (
      <Text style={styles.smallText}>
        1 {base} = {conversionRate} {quote} на следующее время:{" "}
        {moment(date).format("DD-MM-YYYY, HH:mm")}
      </Text>
    );
  } else
    return (
      <Text style={styles.smallText}>
        1 {base} = {conversionRate} {quote} as of{" "}
        {moment(date).format("MMMM Do YYYY, h:mm:ss a")}
      </Text>
    );
};

export default LastConverted;
