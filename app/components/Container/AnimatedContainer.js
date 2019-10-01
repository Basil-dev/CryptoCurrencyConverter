import React, { useLayoutEffect } from "react";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Animated,
  Easing
} from "react-native";
import styles from "./styles";

const Container = ({ children, backgroundColor, fadeIn }) => {
  const fadeAnim = new Animated.Value(0);

  let containerStyles = [styles.container];
  if (backgroundColor) {
    containerStyles.push({ backgroundColor });
  }

  useLayoutEffect(() => {
    if (fadeIn) {
      fadeInAnimation();
    }
  }, [fadeIn]);

  fadeInAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start();
  };

  return (
    <Animated.View style={{ flex: 1, opacity: fadeIn ? fadeAnim : 1 }}>
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
    </Animated.View>
  );
};

export default Container;
