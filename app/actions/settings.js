export const API_KEY = "API_KEY";
export const LANGUAGE = "LANGUAGE";
export const CHANGE_PRIMARY_COLOR = "CHANGE_PRIMARY_COLOR";
export const UI_START_LOADING = "UI_START_LOADING";
export const UI_STOP_LOADING = "UI_STOP_LOADING";

import { AsyncStorage } from "react-native";

export const changeApiKey = apiKey => dispatch => {
  dispatch({
    type: API_KEY,
    apiKey
  });
  AsyncStorage.setItem("@apiKey", apiKey);
};

export const changeLanguage = language => dispatch => {
  dispatch({
    type: LANGUAGE,
    language
  });
  AsyncStorage.setItem("@language", language);
};

export const changePrimaryColor = color => dispatch => {
  dispatch({
    type: CHANGE_PRIMARY_COLOR,
    color
  });
  AsyncStorage.setItem("@color", color);
};

export const uiStartLoading = () => ({
  type: UI_START_LOADING
});

export const uiStopLoading = () => ({
  type: UI_STOP_LOADING
});
