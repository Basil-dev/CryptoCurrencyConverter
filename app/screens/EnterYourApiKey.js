import React, { Component } from "react";
import { View, ActivityIndicator, Keyboard } from "react-native";
import { connect } from "react-redux";
import DropdownAlert from "react-native-dropdownalert";
import EStyleSheet from "react-native-extended-stylesheet";

import { Container } from "../components/Container";
import { InputWithButtonApi } from "../components/TextInput";
import { NavigationHeader } from "../components/NavigationHeader";
import { PlainText } from "../components/Text";
import { Button } from "../components/Button";

import translate from "../utility/translate";
import getLatestRate from "../utility/request";
import validate from "../utility/validate";
import alert from "../utility/alert";
import {
  changeApiKey,
  uiStartLoading,
  uiStopLoading
} from "../actions/settings";
import { getLatestConversion } from "../actions/currencies";

class EnterYourApiKey extends Component {
  static navigationOptions = {
    headerTitle: <NavigationHeader title={"Enter New API Key"} />
  };

  state = {
    apiKey: "",
    valid: false,
    keyBoardShow: false
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = () => {
    this.setState({
      ...this.state,
      keyBoardShow: true
    });
  };

  keyboardDidHide = () => {
    this.setState({
      ...this.state,
      keyBoardShow: false
    });
  };

  handleChangeText = text => {
    this.setState({
      ...this.state,
      apiKey: text,
      valid: validate(text)
    });
  };

  alertDropDown = type => {
    const language = this.props.language;
    const result = alert(type, language);
    this.dropDownAlertRef.alertWithType(result[0], result[1], result[2]);
  };

  translateText = text => {
    const language = this.props.language;
    const result = translate(text, language);
    return result;
  };

  testNewApiKey = apiKey => {
    this.props.uiStartLoading();

    if (this.props.baseCurrencyIsFiat) {
      (baseCurrency = this.props.quoteCurrency),
        (quoteCurrency = this.props.baseCurrency);
    } else {
      baseCurrency = this.props.baseCurrency;
      quoteCurrency = this.props.quoteCurrency;
    }

    getLatestRate(baseCurrency, quoteCurrency, apiKey)
      .then(res => {
        res.status = "200"
          ? (this.props.changeApiKey(apiKey),
            this.props.getLatestConversion(res),
            this.alertDropDown("API key is valid"),
            this.setState({
              ...this.state,
              apiKey: "",
              valid: false
            }))
          : this.alertDropDown("Something went wrong");
      })
      .catch(err => {
        if (
          err.response.data.status.error_message === "This API Key is invalid."
        ) {
          this.alertDropDown("API Key is invalid");
        } else {
          this.alertDropDown(`${err.response.data.status.error_message}`);
        }
      });
    this.props.uiStopLoading();
  };

  render() {
    let button;

    if (this.state.valid) {
      button = (
        <Button
          text={this.translateText("Submit")}
          onPress={() => this.testNewApiKey(this.state.apiKey)}
          textColor={this.props.primaryColor}
        />
      );
    }

    if (this.props.isLoading) {
      button = (
        <ActivityIndicator
          size={80}
          style={styles.activityIndicator}
          color={styles.activityIndicator.color}
        />
      );
    }

    return (
      <Container backgroundColor={this.props.primaryColor}>
        <View
          style={{
            position: "absolute",
            top: 40,
            width: "90%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <PlainText
            large={!this.state.keyBoardShow}
            small={this.state.keyBoardShow}
          >
            {this.translateText("Current API Key:")}
          </PlainText>
          <PlainText
            medium={!this.state.keyBoardShow}
            small={this.state.keyBoardShow}
          >
            {this.props.apiKey}
            {!this.state.keyBoardShow ? "\n" : null}
            {!this.state.keyBoardShow ? "\n" : null}
          </PlainText>
          <PlainText
            large={!this.state.keyBoardShow}
            small={this.state.keyBoardShow}
          >
            {this.translateText("Please Enter API Key:")}
          </PlainText>
          <InputWithButtonApi
            textAlignCenter
            placeholder="********-****-****-****-************"
            value={this.state.apiKey}
            onChangeText={this.handleChangeText}
            multiline={true}
            numberOfLines={2}
            isValid={this.state.valid}
            touched={this.state.apiKey !== ""}
            textColor={this.props.primaryColor}
          />
          {button}
        </View>
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  activityIndicator: {
    color: "$white",
    marginBottom: 50
  }
});

const mapStateToProps = state => {
  return {
    baseCurrency: state.currencies.baseCurrency,
    quoteCurrency: state.currencies.quoteCurrency,
    baseCurrencyIsFiat: state.currencies.baseCurrencyIsFiat,
    primaryColor: state.settings.primaryColor,
    apiKey: state.settings.apiKey,
    language: state.settings.language,
    isLoading: state.settings.isLoading
  };
};

export default connect(
  mapStateToProps,
  { changeApiKey, getLatestConversion, uiStartLoading, uiStopLoading }
)(EnterYourApiKey);
