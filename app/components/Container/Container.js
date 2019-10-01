import React from "react";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  View
} from "react-native";
import styles from "./styles";

const Container = ({ children, backgroundColor }) => {
  let containerStyles = [styles.container];
  if (backgroundColor) {
    containerStyles.push({ backgroundColor });
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={containerStyles}
          behavior="padding"
          enabled
        >
          {children}
          <View style={{ flex: 1 }} />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Container;
