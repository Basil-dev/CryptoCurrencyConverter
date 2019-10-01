import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Flag } from "react-native-svg-flagkit";

import styles from "./styles";

const HeaderWithFlag = ({ onPress, flag }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.flag} onPress={onPress}>
      <Flag id={flag} size={0.1} />
    </TouchableOpacity>
  </View>
);

export default HeaderWithFlag;
