import React from "react";
import styles from "./styles";
import { TouchableOpacity, Text } from "react-native";

const Button = props => (
  <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
    <Text
      style={[
        styles.buttonText,
        props.textColor ? { color: props.textColor } : null
      ]}
    >
      {props.text}
    </Text>
  </TouchableOpacity>
);

export default Button;
