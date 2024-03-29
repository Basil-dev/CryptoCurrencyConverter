import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { Provider } from "react-redux";
import AppContainer from "./app/config/routes";
import store from "./app/config/store";

EStyleSheet.build({
  $primaryBlue: "#4f6D7A",
  $primaryOrange: "#D57A66",
  $primaryGreen: "#00BD9D",
  $primaryPurple: "#9E768F",

  $white: "#FFFFFF",
  $border: "#E2E2E2",
  $lightGray: "#F0F0F0",
  $darkText: "#343434",

  $outline: 0
});

export default () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
