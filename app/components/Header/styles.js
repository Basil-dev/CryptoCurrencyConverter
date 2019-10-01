import EStyleSheet from "react-native-extended-stylesheet";
import { StatusBar } from "react-native";
import { Dimensions } from "react-native";
const headerHeight = Dimensions.get("window").height * 0.125;

export default EStyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: headerHeight,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight * 1.5
  },
  button: { marginRight: 10, paddingLeft: 30 },
  icon: { width: 18 },
  flag: {
    borderWidth: 2,
    borderColor: "$white",
    marginRight: 10,
    borderRadius: 3
  }
});
