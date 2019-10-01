import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";

import { NavigationHeader } from "../components/NavigationHeader";
import { ListItem, Separator } from "../components/List";
import { changePrimaryColor } from "../actions/settings";

import translate from "../utility/translate";

const styles = EStyleSheet.create({
  $blue: "$primaryBlue",
  $orange: "$primaryOrange",
  $green: "$primaryGreen",
  $purple: "$primaryPurple"
});

class Themes extends Component {
  static navigationOptions = {
    headerTitle: <NavigationHeader title={"Themes"} />
  };

  handleThemePress = color => {
    this.props.dispatch(changePrimaryColor(color));
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
            text={this.translateText("Blue")}
            onPress={() => this.handleThemePress(styles.$blue)}
            selected
            checkmark={false}
            iconBackground={styles.$blue}
          />
          <Separator />
          <ListItem
            text={this.translateText("Orange")}
            onPress={() => this.handleThemePress(styles.$orange)}
            selected
            checkmark={false}
            iconBackground={styles.$orange}
          />
          <Separator />
          <ListItem
            text={this.translateText("Green")}
            onPress={() => this.handleThemePress(styles.$green)}
            selected
            checkmark={false}
            iconBackground={styles.$green}
          />
          <Separator />
          <ListItem
            text={this.translateText("Purple")}
            onPress={() => this.handleThemePress(styles.$purple)}
            selected
            checkmark={false}
            iconBackground={styles.$purple}
          />
          <Separator />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  language: state.settings.language
});

export default connect(mapStateToProps)(Themes);
