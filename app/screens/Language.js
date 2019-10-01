import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";

import { NavigationHeader } from "../components/NavigationHeader";
import { ListItem, Separator } from "../components/List";

import { changeLanguage } from "../actions/settings";

class Language extends Component {
  static navigationOptions = {
    headerTitle: <NavigationHeader title={"Language"} />
  };

  handlePress = language => {
    this.props.changeLanguage(language);
    this.props.navigation.goBack();
  };

  render() {
    if (this.props.language === "Russian") this.props.navigation.setParams;
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <ListItem
            text="English"
            onPress={() => this.handlePress("English")}
            selected={this.props.language === "English"}
            iconBackground={this.props.primaryColor}
          />
          <Separator />
          <ListItem
            text="Русский"
            onPress={() => this.handlePress("Russian")}
            selected={this.props.language === "Russian"}
            iconBackground={this.props.primaryColor}
          />
          <Separator />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  cryptosToShow: state.currencies.cryptosToShow,
  primaryColor: state.settings.primaryColor,
  language: state.settings.language
});

export default connect(
  mapStateToProps,
  { changeLanguage }
)(Language);
