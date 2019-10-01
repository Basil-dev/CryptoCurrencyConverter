import React, { Component } from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import styles from "./styles";
import color from "color";

class InputWithButton extends Component {
  constructor(props) {
    super(props);

    this.underlayColor = color(styles.$buttonBackgroundColorBase).darken(
      styles.$buttonBackgroundColorModifier
    );
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          this.props.editable === false ? styles.containerDisabled : null
        ]}
      >
        <TouchableHighlight
          style={[
            styles.buttonContainer,
            !this.props.button ? { display: "none" } : null
          ]}
          onPress={this.props.onPress}
          underlayColor={this.underlayColor}
        >
          <Text
            style={[
              styles.buttonText,
              this.props.textColor ? { color: this.props.textColor } : null
            ]}
          >
            {this.props.buttonText}
          </Text>
        </TouchableHighlight>
        <View style={styles.border} />
        <View
          style={[
            styles.inputContainer,
            this.props.editable === false ? styles.containerDisabled : null
          ]}
        >
          <TextInput {...this.props} style={styles.input} />
        </View>
      </View>
    );
  }
}

export default InputWithButton;
