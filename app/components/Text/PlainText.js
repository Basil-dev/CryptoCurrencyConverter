import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const PlainText = ({ children, large, medium, small, hidden }) => (
  <View>
    <Text
      style={[
        large ? styles.largeText : null,
        medium ? styles.mediumText : null,
        small ? styles.smallText : null,
        hidden ? { display: "none" } : null
      ]}
    >
      {children}
    </Text>
  </View>
);

export default PlainText;
