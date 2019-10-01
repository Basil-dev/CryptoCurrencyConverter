import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import styles from "./styles";
import color from "color";

class InputWithButton extends Component {
  constructor(props) {
    super(props);

    this.underlayColor = color(styles.$buttonBackgroundColorBase).darken(
      styles.$buttonBackgroundColorModifier
    );

    this.state = {
      inputHeight: 0
    };
  }

  handleSizeChange = event => {
    this.setState({
      inputHeight: event.nativeEvent.contentSize.height
    });
  };

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
            !this.props.button ? { display: "none" } : null,
            !this.props.isValid ? styles.containerDisabled : null
          ]}
          onPress={this.props.onPress}
          underlayColor={this.underlayColor}
          disabled={!this.props.isValid}
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
        <View
          style={[
            styles.border,
            { height: Math.max(48, this.state.inputHeight) },
            !this.props.button ? { display: "none" } : null
          ]}
        />
        <View
          style={[
            styles.inputContainer,
            this.props.editable === false ? styles.containerDisabled : null,
            !this.props.isValid && this.props.touched ? styles.invalid : null,
            !this.props.button ? styles.inputContainerWithoutButton : null
          ]}
        >
          <TextInputMask
            {...this.props}
            style={[
              styles.input,

              { height: Math.max(48, this.state.inputHeight) },
              !this.props.isValid && this.props.touched ? styles.invalid : null,
              this.props.textAlignCenter ? { textAlign: "center" } : null
            ]}
            onContentSizeChange={event => this.handleSizeChange(event)}
            type={"custom"}
            maxLength={36}
            value={this.props.value}
            options={{
              mask: "********-****-****-****-************"
            }}
          />
        </View>
      </View>
    );
  }
}

export default InputWithButton;
