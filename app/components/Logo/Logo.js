import React, { useLayoutEffect, useRef } from "react";
import { StyleSheet, Animated, Dimensions, Easing } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import styles from "./styles";

const Logo = ({
  isLoading,
  tintColor,
  title,
  animated,
  keyboardShow,
  splash,
  splashAnimation
}) => {
  const initialImageSize = splash
    ? Dimensions.get("window").width * 0.8
    : Dimensions.get("window").width * 0.4;

  const dimensionsRatio =
    Dimensions.get("window").width / Dimensions.get("window").height;

  const logoHeight = ratio => {
    if (ratio >= 0.55) {
      return hp(44);
    }
    if (ratio >= 0.525 && ratio <= 0.55) {
      return hp(49);
    }
    if (ratio >= 0.5 && ratio <= 0.525) {
      return hp(52);
    }
  };
  const imageSize = new Animated.Value(initialImageSize);
  const innerImageSize = new Animated.Value(initialImageSize / 2);
  const textSize = new Animated.Value(25);
  const logoMarginBottom = new Animated.Value(0);
  const logoRotation = new Animated.Value(1);
  const rotateInterpolate = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  const firstUpdate = useRef(true);

  setLogoSmall = () => {
    imageSize.setValue(initialImageSize / 2),
      innerImageSize.setValue(initialImageSize / 4),
      textSize.setValue(10);
  };

  setLogoLarge = () => {
    imageSize.setValue(initialImageSize),
      innerImageSize.setValue(initialImageSize / 2),
      textSize.setValue(25);
  };

  useLayoutEffect(() => {
    if (keyboardShow) {
      animated ? animateSetLogoSmall(500) : setLogoSmall();
    }
  }, [keyboardShow]);

  useLayoutEffect(() => {
    if (splashAnimation) {
      logoRotation.setValue(0);
      rotateLogo(1000);
      animateSetLogoSmall(1000);
      animateLogoUpwardMovement(1000);
    }
  }, [splashAnimation]);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    } else if (!keyboardShow) {
      animated ? (setLogoSmall(), animateSetLogoLarge()) : setLogoLarge();
    }
  }, [keyboardShow]);

  useLayoutEffect(() => {
    if (isLoading) {
      logoRotation.setValue(0);
      rotateLogo(300);
    }
  }, [isLoading]);

  rotateLogo = duration => {
    Animated.timing(logoRotation, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  animateSetLogoSmall = duration => {
    Animated.parallel([
      Animated.timing(imageSize, {
        toValue: initialImageSize / 2,
        duration,
        easing: Easing.linear
      }),
      Animated.timing(innerImageSize, {
        toValue: initialImageSize / 4,
        duration,
        easing: Easing.linear
      }),
      Animated.timing(textSize, {
        toValue: 10,
        duration,
        easing: Easing.linear
      })
    ]).start();
  };

  animateLogoUpwardMovement = duration => {
    Animated.timing(logoMarginBottom, {
      toValue: logoHeight(dimensionsRatio),
      duration,
      easing: Easing.linear
    }).start();
  };

  animateSetLogoLarge = () => {
    Animated.parallel([
      Animated.timing(imageSize, {
        toValue: initialImageSize,
        duration: 500,
        easing: Easing.linear
      }),
      Animated.timing(innerImageSize, {
        toValue: initialImageSize / 2,
        duration: 500,
        easing: Easing.linear
      }),
      Animated.timing(textSize, {
        toValue: 25,
        duration: 500,
        easing: Easing.linear
      })
    ]).start();
  };

  return (
    <Animated.View style={{ marginBottom: logoMarginBottom }}>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ rotate: rotateInterpolate }] }
        ]}
      >
        <Animated.View
          style={[
            styles.containerImage,

            {
              width: imageSize,
              height: imageSize
            }
          ]}
        >
          <Animated.Image
            source={require("./images/background.png")}
            style={[
              styles.containerImage,
              StyleSheet.absoluteFill,

              {
                width: imageSize,
                height: imageSize
              }
            ]}
            resizeMode={"contain"}
          />
          <Animated.Image
            source={require("./images/logo.png")}
            style={[
              styles.image,

              {
                width: innerImageSize,
                height: innerImageSize
              },

              tintColor ? { tintColor: tintColor } : null
            ]}
            resizeMode={"contain"}
          />
        </Animated.View>
      </Animated.View>
      <Animated.Text
        style={[
          styles.text,

          {
            fontSize: textSize,
            marginTop: textSize,
            marginBottom: textSize
          }
        ]}
      >
        {title}
      </Animated.Text>
    </Animated.View>
  );
};

export default Logo;
