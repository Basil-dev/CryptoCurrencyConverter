import EStyleSheet from "react-native-extended-stylesheet";

const INPUT_HEIGHT = 48;
const BORDER_RADIUS = 4;

export default EStyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  text: {
    fontWeight: "300",
    fontSize: 18,
    letterSpacing: -0.5,
    color: "$white",
    marginLeft: 10,
    paddingVertical: 10
  },
  smallText: {
    fontWeight: "300",
    fontSize: 14,
    letterSpacing: -0.5,
    color: "$white",
    marginLeft: 5,
    paddingVertical: 10
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "$white",
    minHeight: INPUT_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "$white",
    borderRadius: BORDER_RADIUS
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 20,
    paddingHorizontal: 16,
    color: "$primaryBlue"
  }
});
