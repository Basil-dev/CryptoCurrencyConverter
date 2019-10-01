import { combineReducers } from "redux";
import currencies from "./currencies";
import settings from "./settings";

export default combineReducers({
  currencies,
  settings
});
