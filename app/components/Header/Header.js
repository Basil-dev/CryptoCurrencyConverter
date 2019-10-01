import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

const Header = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={require("./images/gear.png")}
        resizeMode="contain"
        style={styles.icon}
      />
    </TouchableOpacity>
  </View>
);

export default Header;
