export const CHANGE_CURRENCY_AMOUNT = "CHANGE_CURRENCY_AMOUNT";
export const SWAP_CURRENCY = "SWAP_CURRENCY";
export const CHANGE_BASE_CURRENCY = "CHANGE_BASE_CURRENCY";
export const CHANGE_QUOTE_CURRENCY = "CHANGE_QUOTE_CURRENCY";
export const CHANGE_BASE_CURRENCY_INITIAL = "CHANGE_BASE_CURRENCY_INITIAL";
export const CHANGE_QUOTE_CURRENCY_INITIAL = "CHANGE_QUOTE_CURRENCY_INITIAL";
export const GET_INITIAL_CONVERSION = "GET_INITIAL_CONVERSION ";
export const CONVERSION_RESULT = "CONVERSION_RESULT";
export const CONVERSION_ERROR = "CONVERSION_ERROR";
export const UPDATE_RATE = "UPDATE_RATE";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const CRYPTOS_TO_SHOW = "CRYPTOS_TO_SHOW";

import { AsyncStorage } from "react-native";

export const changeCurrencyAmount = amount => ({
  type: CHANGE_CURRENCY_AMOUNT,
  amount: parseFloat(amount)
});

export const swapCurrency = () => ({
  type: SWAP_CURRENCY
});

export const changeBaseCurrency = currency => dispatch => {
  AsyncStorage.setItem("@baseCurrency", currency)
    .then(
      dispatch({
        type: CHANGE_BASE_CURRENCY,
        currency
      })
    )
    .catch(
      dispatch({
        type: CHANGE_BASE_CURRENCY,
        currency
      })
    );
};

export const changeQuoteCurrency = currency => dispatch => {
  AsyncStorage.setItem("@quoteCurrency", currency)
    .then(
      dispatch({
        type: CHANGE_QUOTE_CURRENCY,
        currency
      })
    )
    .catch(
      dispatch({
        type: CHANGE_QUOTE_CURRENCY,
        currency
      })
    );
};

export const getLatestConversion = result => ({
  type: CONVERSION_RESULT,
  result
});

export const updateRate = result => ({
  type: UPDATE_RATE,
  result
});

export const changeCryptosToShow = number => ({
  type: CRYPTOS_TO_SHOW,
  number
});

export const clearError = () => ({
  type: CLEAR_ERROR
});

export const changeBaseCurrencyInitial = currency => ({
  type: CHANGE_BASE_CURRENCY_INITIAL,
  currency
});

export const changeQuoteCurrencyInitial = currency => ({
  type: CHANGE_QUOTE_CURRENCY_INITIAL,
  currency
});
