import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./styles";

const Icon = ({ checkmark, visible, iconBackground }) => {
  const iconStyles = [styles.icon];

  if (visible) {
    iconStyles.push(styles.iconVisible);
  }

  if (iconBackground) {
    iconStyles.push({ backgroundColor: iconBackground });
  }

  return (
    <View style={iconStyles}>
      {checkmark ? (
        <Image
          style={styles.checkIcon}
          source={require("./images/check.png")}
          resizeMode="contain"
        />
      ) : null}
    </View>
  );
};

export default Icon;
