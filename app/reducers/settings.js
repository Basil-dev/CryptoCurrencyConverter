import {
  API_KEY,
  LANGUAGE,
  CHANGE_PRIMARY_COLOR,
  UI_START_LOADING,
  UI_STOP_LOADING
} from "../actions/settings";

const initialState = {
  apiKey: "",
  language: "English",
  primaryColor: "#4F6D7A",
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case API_KEY:
      return { ...state, apiKey: action.apiKey };
    case LANGUAGE:
      return { ...state, language: action.language };
    case CHANGE_PRIMARY_COLOR:
      return { ...state, primaryColor: action.color };
    case UI_START_LOADING:
      return { ...state, isLoading: true };
    case UI_STOP_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
