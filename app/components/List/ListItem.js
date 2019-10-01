import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styles from "./styles";
import Icon from "./icon";

const ListItem = ({
  text,
  onPress,
  selected = false,
  checkmark = true,
  visible = true,
  customIcon = null,
  iconBackground
}) => (
  <TouchableHighlight onPress={onPress} underlayColor={styles.$underlayColor}>
    <View style={styles.row}>
      <Text style={styles.text}>{text}</Text>
      {selected ? (
        <Icon
          iconBackground={iconBackground}
          checkmark={checkmark}
          visible={visible}
        />
      ) : (
        <Icon />
      )}
      {customIcon}
    </View>
  </TouchableHighlight>
);

export default ListItem;
