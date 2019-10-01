import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import styles from "./styles";

class NavigationHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let title = this.props.title;

    if (this.props.language === "Russian")
      switch (title) {
        case "Language":
          title = "Язык";
          break;
        case "Options":
          title = "Опции";
          break;
        case "Themes":
          title = "Темы";
          break;
        case "Cryptocurrencies":
          title = "Криптовалюты";
          break;
        case "Enter New API Key":
          title = "Ввести новый ключ API";
          break;
        case "Cryptocurrencies":
          title = "Криптовалюты";
          break;
        default:
          return title;
      }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  language: state.settings.language
});

export default connect(mapStateToProps)(NavigationHeader);
