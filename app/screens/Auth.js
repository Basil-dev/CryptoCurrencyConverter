import React, { Component } from "react";
import DropdownAlert from "react-native-dropdownalert";
import Hyperlink from "react-native-hyperlink";
import * as WebBrowser from "expo-web-browser";
import { View, AsyncStorage, Keyboard } from "react-native";
import { connect } from "react-redux";

import { Logo } from "../components/Logo";
import { HeaderWithFlag } from "../components/Header";
import { AnimatedContainer } from "../components/Container";
import { InputWithButtonApi } from "../components/TextInput";
import { NavigationHeader } from "../components/NavigationHeader";
import { Button } from "../components/Button";
import { PlainText } from "../components/Text";

import currencies from "../data/currencies";
import translate from "../utility/translate";
import alert from "../utility/alert";
import validate from "../utility/validate";
import {
  changeApiKey,
  changeLanguage,
  changePrimaryColor
} from "../actions/settings";
import {
  getLatestConversion,
  changeBaseCurrencyInitial,
  changeQuoteCurrencyInitial
} from "../actions/currencies";
import getLatestRate from "../utility/request";

class Auth extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    headerTitle: <NavigationHeader title={"Enter New API Key"} />
  };

  state = {
    apiKey: "",
    valid: false,
    loadingFromAsyncStorage: true,
    keyboardShow: false,
    splashScreenIsOn: true,
    splashScreenAnimationIsOn: false,
    fadeInAuthScreen: false,
    flag: "RU"
  };

  componentWillMount() {
    const keys = [
      "@language",
      "@color",
      "@baseCurrency",
      "@quoteCurrency",
      "@apiKey"
    ];

    //AsyncStorage.multiRemove(keys);

    this.loadKeysFromAsyncStorage(keys);
  }

  loadKeysFromAsyncStorage = async keys => {
    try {
      const res = await AsyncStorage.multiGet(keys);

      let baseCurrency;
      let quoteCurrency;
      let apiKey;

      if (res[0][1]) {
        this.props.changeLanguage(res[0][1]);
      }
      if (res[1][1]) {
        this.props.changePrimaryColor(res[1][1]);
      }

      if (res[2][1] && !currencies.includes(res[2][1])) {
        this.props.changeBaseCurrencyInitial(res[2][1]);
        baseCurrency = res[2][1];
      } else baseCurrency = this.props.baseCurrency;

      if (res[3][1] && currencies.includes(res[3][1])) {
        this.props.changeQuoteCurrencyInitial(res[3][1]);
        quoteCurrency = res[3][1];
      } else quoteCurrency = this.props.quoteCurrency;

      if (res[4][1]) {
        apiKey = res[4][1];
        this.testNewApiKey(baseCurrency, quoteCurrency, apiKey);
      } else {
        this.setState({
          ...this.state,
          loadingFromAsyncStorage: false
        });
        this.animateSplashScreen();
        this.showLoginScreen();
      }
    } catch (err) {
      this.setState({
        ...this.state,
        loadingFromAsyncStorage: false
      });
      this.animateSplashScreen();
      this.showLoginScreen();
    }
  };

  animateSplashScreen = () => {
    setTimeout(() => {
      this.setState({
        ...this.state,
        splashScreenAnimationIsOn: true
      });
    }, 500);
  };

  showLoginScreen = () => {
    setTimeout(() => {
      this.setState({
        ...this.state,
        splashScreenIsOn: false,
        fadeInAuthScreen: true
      });
    }, 2000);
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
      keyboardShow: true
    });
  };

  keyboardDidHide = () => {
    this.setState({
      ...this.state,
      keyboardShow: false
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

  testNewApiKey = async (baseCurrency, quoteCurrency, apiKey) => {
    try {
      const res = await getLatestRate(baseCurrency, quoteCurrency, apiKey);
      if ((res.status = "200")) {
        this.props.changeApiKey(apiKey);
        this.props.getLatestConversion(res);

        if (!this.state.loadingFromAsyncStorage) {
          this.alertDropDown("API key is valid");
          setTimeout(() => {
            this.props.navigation.navigate("Home");
          }, 3000);
        } else {
          this.animateSplashScreen();
          setTimeout(() => {
            this.props.navigation.navigate("Home");
          }, 3000);
        }
      } else {
        this.alertDropDown("Something went wrong");
      }
    } catch (err) {
      if (!this.state.loadingFromAsyncStorage) {
        if (
          err.response.data.status.error_message === "This API Key is invalid."
        ) {
          this.alertDropDown("API Key is invalid");
        } else {
          this.alertDropDown(`${err.response.data.status.error_message}`);
        }
      } else {
        this.animateSplashScreen();
        this.showLoginScreen();
      }
    }
  };

  changeFlag = () => {
    this.setState({
      ...this.state,
      flag: this.state.flag === "GB" ? "RU" : "GB"
    });
  };

  render() {
    const button = this.state.valid ? (
      <Button
        text={this.translateText("Submit")}
        onPress={() =>
          this.testNewApiKey(
            this.props.baseCurrency,
            this.props.quoteCurrency,
            this.state.apiKey
          )
        }
        textColor={this.props.primaryColor}
      />
    ) : null;

    const language = this.props.language === "English" ? "Russian" : "English";

    if (this.state.splashScreenIsOn) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Logo
            splash
            splashAnimation={this.state.splashScreenAnimationIsOn}
            tintColor={this.props.primaryColor}
          />
        </View>
      );
    }

    if (!this.state.splashScreenIsOn) {
      return (
        <AnimatedContainer
          fadeIn={this.state.fadeInAuthScreen}
          backgroundColor={this.props.primaryColor}
        >
          <HeaderWithFlag
            onPress={() => {
              this.props.changeLanguage(language);
              this.changeFlag();
            }}
            flag={this.state.flag}
          />

          <View
            style={{
              width: "90%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Logo
              animated
              keyboardShow={this.state.keyboardShow}
              tintColor={this.props.primaryColor}
              title={this.translateText("Cryptocurrency Converter")}
            />
            <PlainText large>
              {this.translateText("Please Enter API Key:")}
            </PlainText>
            <InputWithButtonApi
              multiline={true}
              numberOfLines={2}
              textAlignCenter
              buttonText="OK"
              placeholder="********-****-****-****-************"
              value={this.state.apiKey}
              onChangeText={this.handleChangeText}
              isValid={this.state.valid}
              touched={this.state.apiKey !== ""}
              textColor={this.props.primaryColor}
            />
            {button}
            <Hyperlink
              linkStyle={{ textDecorationLine: "underline" }}
              linkText={url =>
                url === "https://pro.coinmarketcap.com/login/"
                  ? this.translateText("your account at Coinmarketcap.com")
                  : url
              }
              onPress={url => WebBrowser.openBrowserAsync(url)}
            >
              <PlainText medium hidden={this.state.valid}>
                {this.translateText(
                  "You can get your API key in https://pro.coinmarketcap.com/login/"
                )}
              </PlainText>
            </Hyperlink>
            <DropdownAlert
              ref={ref => (this.dropDownAlertRef = ref)}
              wrapperStyle={{ opacity: 0.8 }}
            />
          </View>
        </AnimatedContainer>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    baseCurrency: state.currencies.baseCurrency,
    quoteCurrency: state.currencies.quoteCurrency,
    primaryColor: state.settings.primaryColor,
    apiKey: state.settings.apiKey,
    language: state.settings.language,
    loadingFromAsyncStorage: state.settings.loadingFromAsyncStorage
  };
};

export default connect(
  mapStateToProps,
  {
    changeApiKey,
    changeLanguage,
    changePrimaryColor,
    getLatestConversion,
    changeBaseCurrencyInitial,
    changeQuoteCurrencyInitial
  }
)(Auth);
