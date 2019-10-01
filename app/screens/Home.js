import React, { Component } from "react";
import {
  View,
  Platform,
  Keyboard,
  UIManager,
  LayoutAnimation
} from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import { connect } from "react-redux";

import { Container } from "../components/Container";
import { Logo } from "../components/Logo";
import { InputWithButton } from "../components/TextInput";
import { ClearButton } from "../components/Button";
import { LastConverted } from "../components/Text";
import { Header } from "../components/Header";

import alert from "../utility/alert";
import translate from "../utility/translate";
import {
  changeCurrencyAmount,
  swapCurrency,
  clearError,
  updateRate
} from "../actions/currencies";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      keyboardShow: false,
      clearButtonsFlexDirection: "column"
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  componentDidUpdate() {
    if (this.props.errorMessage) {
      this.alertDropDown(this.props.errorMessage);
      this.props.dispatch(clearError());
    }
  }

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

    LayoutAnimation.easeInEaseOut();

    this.setState({ clearButtonsFlexDirection: "row" });
  };

  keyboardDidHide = () => {
    this.setState({
      ...this.state,
      keyboardShow: false
    });
    LayoutAnimation.easeInEaseOut();

    this.setState({ clearButtonsFlexDirection: "column" });
  };

  alertDropDown = type => {
    const language = this.props.language;
    const result = alert(type, language);
    this.dropDownAlertRef.alertWithType(result[0], result[1], result[2]);
  };

  handlePressBaseCurrency = () => {
    !this.props.baseCurrencyIsFiat
      ? this.props.navigation.navigate("CurrencyList", {
          title: this.translateText("Cryptocurrency"),
          type: "crypto"
        })
      : this.props.navigation.navigate("CurrencyList", {
          title: this.translateText("Fiat Currency"),
          type: "fiat"
        });
  };

  translateText = text => {
    const language = this.props.language;
    const result = translate(text, language);
    return result;
  };

  handlePressQuoteCurrency = () => {
    !this.props.baseCurrencyIsFiat
      ? this.props.navigation.navigate("CurrencyList", {
          title: this.translateText("Fiat Currency"),
          type: "fiat"
        })
      : this.props.navigation.navigate("CurrencyList", {
          title: this.translateText("Cryptocurrency"),
          type: "crypto"
        });
  };

  handleSwapCurrency = () => {
    this.props.dispatch(swapCurrency());
  };

  handleUpdateRate = () => {
    this.props.dispatch(updateRate());
  };

  handleOptionsPress = () => {
    this.props.navigation.navigate("Options");
  };

  handleChangeText = text => {
    this.props.dispatch(changeCurrencyAmount(text));
  };

  onBackButtonPressAndroid = () => {
    return true;
  };

  render() {
    let quotePriceRaw =
      Math.round(this.props.amount * this.props.conversionRate * 100) / 100;

    let quotePrice = quotePriceRaw.toString();

    return (
      <Container backgroundColor={this.props.primaryColor}>
        <Header onPress={this.handleOptionsPress} />
        <View
          style={{
            width: "90%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Logo
            isLoading={this.props.isLoading}
            keyboardShow={this.state.keyboardShow}
            tintColor={this.props.primaryColor}
            title={this.translateText("Cryptocurrency Converter")}
          />
          <InputWithButton
            button
            buttonText={this.props.baseCurrency}
            onPress={() => this.handlePressBaseCurrency()}
            defaultValue={this.props.amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleChangeText}
            textColor={this.props.primaryColor}
          />
          <InputWithButton
            button
            buttonText={this.props.quoteCurrency}
            keyboardType="numeric"
            onPress={() => this.handlePressQuoteCurrency()}
            editable={false}
            value={quotePrice}
            textColor={this.props.primaryColor}
          />
          <LastConverted
            base={this.props.baseCurrency}
            quote={this.props.quoteCurrency}
            conversionRate={this.props.conversionRate}
            date={this.props.lastUpdated}
            language={this.props.language}
          />
          <View
            style={
              this.state.keyboardShow
                ? {
                    width: "100%",
                    flexDirection: this.state.clearButtonsFlexDirection,
                    justifyContent: "space-between",
                    alignItems: "center"
                  }
                : null
            }
          >
            <ClearButton
              text={this.translateText("Reverse Currencies")}
              smallText={this.state.keyboardShow}
              onPress={this.handleSwapCurrency}
            />
            <ClearButton
              text={this.translateText("Update Exchange Rate")}
              smallText={this.state.keyboardShow}
              onPress={this.handleUpdateRate}
            />
          </View>

          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    baseCurrency: state.currencies.baseCurrency,
    quoteCurrency: state.currencies.quoteCurrency,
    amount: state.currencies.amount,
    conversionRate: state.currencies.rate,
    primaryColor: state.settings.primaryColor,
    isLoading: state.settings.isLoading,
    errorMessage: state.currencies.error,
    baseCurrencyIsFiat: state.currencies.baseCurrencyIsFiat,
    lastUpdated: state.currencies.lastUpdated,
    language: state.settings.language
  };
};

export default connect(mapStateToProps)(Home);
