import React, { Component } from "react";
import { ScrollView, StatusBar, Linking, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import DropdownAlert from "react-native-dropdownalert";
import { EvilIcons } from "@expo/vector-icons";

import { NavigationHeader } from "../components/NavigationHeader";
import { ListItem, Separator } from "../components/List";

import translate from "../utility/translate";

const ICON_PREFIX = Platform.OS === "ios" ? "ios" : "md";
const ICON_COLOR = "#686868";
const ICON_SIZE = 23;

class Options extends Component {
  handlePressLanguage = () => {
    this.props.navigation.navigate("Language");
  };

  handlePressThemes = () => {
    this.props.navigation.navigate("Themes");
  };

  handlePressCryptocurrencies = () => {
    this.props.navigation.navigate("Cryptocurrencies");
  };

  handlePressEnterYourApiKey = () => {
    this.props.navigation.navigate("EnterYourApiKey");
  };

  handleSitePress = () => {
    Linking.openURL("https://coinmarketcap.com").catch(() =>
      this.dropDownAlertRef.alertWithType(
        "error",
        "Sorry",
        "Coinmarketcap.com not accessible"
      )
    );
  };

  translateText = text => {
    const language = this.props.language;
    const result = translate(text, language);
    return result;
  };

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          text={this.translateText("Language")}
          onPress={this.handlePressLanguage}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-arrow-forward`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
        <Separator />
        <ListItem
          text={this.translateText("Themes")}
          onPress={this.handlePressThemes}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-arrow-forward`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
        <Separator />
        <ListItem
          text={this.translateText("Cryptocurrencies")}
          onPress={this.handlePressCryptocurrencies}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-arrow-forward`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
        <Separator />
        <ListItem
          text={this.translateText("Enter New API Key")}
          onPress={this.handlePressEnterYourApiKey}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-arrow-forward`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
        <Separator />
        <ListItem
          text="Coinmarketcap.com"
          onPress={this.handleSitePress}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-link`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
      </ScrollView>
    );
  }
}

Options.navigationOptions = {
  headerTitle: <NavigationHeader title={"Options"} />,
  headerBackImage: <EvilIcons name="arrow-left" size={35} />
};

const mapStateToProps = state => ({
  language: state.settings.language
});

export default connect(mapStateToProps)(Options);
