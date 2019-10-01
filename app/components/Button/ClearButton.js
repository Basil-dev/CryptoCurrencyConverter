import React from "react";
import styles from "./styles";
import { TouchableOpacity, Text, Image } from "react-native";

const ClearButton = props => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <Image source={require("./images/icon.png")} resizeMode={"contain"} />
    <Text style={[props.smallText ? styles.smallText : styles.text]}>
      {props.text}
    </Text>
  </TouchableOpacity>
);

export default ClearButton;
