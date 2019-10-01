import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";

import { NavigationHeader } from "../components/NavigationHeader";
import { ListItem, Separator } from "../components/List";

import { changeCryptosToShow } from "../actions/currencies";
import translate from "../utility/translate";

class Cryptocurrencies extends Component {
  static navigationOptions = {
    headerTitle: <NavigationHeader title={"Cryptocurrencies"} />
  };

  handlePress = number => {
    this.props.dispatch(changeCryptosToShow(number));
    this.props.navigation.goBack();
  };

  translateText = text => {
    const language = this.props.language;
    const result = translate(text, language);
    return result;
  };

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <ListItem
            text={this.translateText("Show Top 100")}
            onPress={() => this.handlePress(100)}
            selected={this.props.cryptosToShow === 100}
            iconBackground={this.props.primaryColor}
          />
          <Separator />
          <ListItem
            text={this.translateText("Show Top 300")}
            onPress={() => this.handlePress(300)}
            selected={this.props.cryptosToShow === 300}
            iconBackground={this.props.primaryColor}
          />
          <Separator />
          <ListItem
            text={this.translateText("Show Top 500")}
            onPress={() => this.handlePress(500)}
            selected={this.props.cryptosToShow === 500}
            iconBackground={this.props.primaryColor}
          />
          <Separator />
          <ListItem
            text={this.translateText("Show All")}
            onPress={() => this.handlePress(null)}
            selected={this.props.cryptosToShow === null}
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

export default connect(mapStateToProps)(Cryptocurrencies);
