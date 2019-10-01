import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet } from "react-native";

const INPUT_HEIGHT = 48;
const BORDER_RADIUS = 4;

export default EStyleSheet.create({
  $buttonBackgroundColorBase: "$white",
  $buttonBackgroundColorModifier: 0.1,

  container: {
    backgroundColor: "$white",
    width: "100%",
    minHeight: INPUT_HEIGHT,
    borderRadius: BORDER_RADIUS,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 11
  },
  containerDisabled: {
    backgroundColor: "$lightGray"
  },
  buttonContainer: {
    backgroundColor: "$white",
    minHeight: INPUT_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "$white",
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 20,
    paddingHorizontal: 16,
    color: "$primaryBlue"
  },
  border: {
    minHeight: INPUT_HEIGHT,
    width: StyleSheet.hairlineWidth,
    backgroundColor: "$border"
  },
  inputContainer: {
    minHeight: INPUT_HEIGHT,
    flex: 1,
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    backgroundColor: "$white",
    paddingHorizontal: 10
  },
  inputContainerWithoutButton: {
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS
  },
  input: {
    minHeight: INPUT_HEIGHT,
    fontSize: 18
  },
  invalid: {
    backgroundColor: "#f9c0c0",
    borderColor: "red"
  }
});
