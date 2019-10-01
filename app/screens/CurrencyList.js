import React, { Component } from "react";
import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";
import { SearchBar } from "react-native-elements";
import DropdownAlert from "react-native-dropdownalert";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";
import axios from "axios";

import { ListItem, Separator } from "../components/List/";
import currencies from "../data/currencies";

import { changeBaseCurrency, changeQuoteCurrency } from "../actions/currencies";

class CurrencyList extends Component {
  state = {
    loading: false,
    refreshing: false,
    endReached: false,
    data: [],
    error: null,
    search: ""
  };

  arrayholder = [];

  componentDidMount() {
    if (this.props.navigation.state.params.type === "crypto") {
      this.setState({ ...this.state, loading: true });
      this.makeRemoteRequest();
    }
  }

  makeRemoteRequest = () => {
    axios
      .get(
        this.props.cryptosToShow
          ? `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?sort=market_cap&start=1&limit=${this.props.cryptosToShow}`
          : `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?sort=market_cap&start=1&limit=5000`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": this.props.apiKey,
            Accept: "application/json"
          }
        }
      )
      .then(res => {
        this.setState({
          ...this.state,
          data: res.data.data,
          loading: false
        });

        this.arrayholder = res.data.data;
      })
      .catch(err => {
        this.dropDownAlertRef.alertWithType(
          "error",
          "Error",
          `${err.response.data.status.error_message}`
        );

        this.setState({
          ...this.state,
          refreshing: false,
          loading: false,
          endReached: true
        });
      });
  };

  handlePress = currency => {
    const { type } = this.props.navigation.state.params;
    if (
      (type === "crypto" && !this.props.baseCurrencyIsFiat) ||
      (type === "fiat" && this.props.baseCurrencyIsFiat)
    ) {
      this.props.changeBaseCurrency(currency);
    } else if (
      (type === "fiat" && !this.props.baseCurrencyIsFiat) ||
      (type === "crypto" && this.props.baseCurrencyIsFiat)
    ) {
      this.props.changeQuoteCurrency(currency);
    }
    this.props.navigation.goBack(null);
  };

  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();

      const textData = text.toUpperCase();

      return itemData.includes(textData);
    });

    this.setState({ ...this.state, data: newData, search: text });
  };

  onRefresh = () => {
    this.setState({
      ...this.state,
      refreshing: true
    });
    setTimeout(
      this.setState({
        ...this.state,
        refreshing: false
      }),
      1000
    );
  };

  onEndReached = () => {
    this.setState({
      ...this.state,
      endReached: true
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        round
        containerStyle={[
          styles.searchContainer,
          { backgroundColor: this.props.primaryColor }
        ]}
        inputContainerStyle={styles.inputSearchContainer}
        inputStyle={styles.inputSearchContainerText}
        onChangeText={text => this.searchFilterFunction(text)}
        value={this.state.search}
        autoCorrect={false}
      />
    );
  };

  renderFooter = () => {
    return (
      <View style={styles.footer}>
        <ActivityIndicator
          animating
          size="large"
          color={this.props.primaryColor}
        />
      </View>
    );
  };

  render() {
    let comparisonCurrency;
    if (
      (this.props.navigation.state.params.type === "crypto" &&
        !this.props.baseCurrencyIsFiat) ||
      (this.props.navigation.state.params.type === "fiat" &&
        this.props.baseCurrencyIsFiat)
    ) {
      comparisonCurrency = this.props.baseCurrency;
    }

    if (
      (this.props.navigation.state.params.type === "crypto" &&
        this.props.baseCurrencyIsFiat) ||
      (this.props.navigation.state.params.type === "fiat" &&
        !this.props.baseCurrencyIsFiat)
    ) {
      comparisonCurrency = this.props.quoteCurrency;
    }

    let flatList = (
      <FlatList
        data={currencies}
        renderItem={({ item }) => {
          return (
            <ListItem
              text={item}
              selected={item === comparisonCurrency}
              onPress={() => this.handlePress(item)}
              iconBackground={this.props.primaryColor}
            />
          );
        }}
        keyExtractor={index => index.toString()}
        ItemSeparatorComponent={Separator}
      />
    );

    if (this.props.navigation.state.params.type === "crypto") {
      flatList = (
        <FlatList
          data={this.state.data}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          initialNumToRender={20}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          renderItem={({ item }) => {
            return (
              <ListItem
                text={item.name}
                selected={item.symbol === comparisonCurrency}
                onPress={() => this.handlePress(item.symbol)}
                iconBackground={this.props.primaryColor}
              />
            );
          }}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={Separator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={
            !this.state.endReached ? this.renderFooter : null
          }
        />
      );
    }

    if (this.state.loading) {
      flatList = (
        <ActivityIndicator
          size={80}
          style={styles.activityIndicator}
          color={this.props.primaryColor}
        />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {flatList}
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  activityIndicator: {
    marginTop: 200
  },
  searchContainer: {
    borderWidth: 0,
    shadowColor: "white",
    borderBottomColor: "transparent",
    borderTopColor: "transparent"
  },
  inputSearchContainer: {
    backgroundColor: "$white"
  },
  inputSearchContainerText: {
    color: "$darkText"
  },
  footer: {
    marginLeft: 20,
    paddingVertical: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "$border"
  }
});

const mapStateToProps = state => ({
  baseCurrency: state.currencies.baseCurrency,
  quoteCurrency: state.currencies.quoteCurrency,
  baseCurrencyIsFiat: state.currencies.baseCurrencyIsFiat,
  cryptosToShow: state.currencies.cryptosToShow,
  primaryColor: state.settings.primaryColor,
  apiKey: state.settings.apiKey
});

export default connect(
  mapStateToProps,
  { changeBaseCurrency, changeQuoteCurrency }
)(CurrencyList);
