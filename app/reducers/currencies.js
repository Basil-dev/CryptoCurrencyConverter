import {
  CHANGE_CURRENCY_AMOUNT,
  SWAP_CURRENCY,
  CHANGE_BASE_CURRENCY,
  CHANGE_QUOTE_CURRENCY,
  CHANGE_BASE_CURRENCY_INITIAL,
  CHANGE_QUOTE_CURRENCY_INITIAL,
  CONVERSION_RESULT,
  CONVERSION_ERROR,
  CLEAR_ERROR,
  CRYPTOS_TO_SHOW
} from "../actions/currencies";

const initialState = {
  baseCurrency: "BTC",
  quoteCurrency: "USD",
  baseCurrencyIsFiat: false,
  amount: 1,
  rate: null,
  lastUpdated: null,
  cryptosToShow: 100,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY_AMOUNT:
      return {
        ...state,
        amount: action.amount || 0
      };
    case SWAP_CURRENCY:
      return {
        ...state,
        baseCurrency: state.quoteCurrency,
        quoteCurrency: state.baseCurrency,
        rate: 1 / state.rate,
        baseCurrencyIsFiat: !state.baseCurrencyIsFiat
      };
    case CHANGE_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: action.currency
      };
    case CHANGE_QUOTE_CURRENCY:
      return {
        ...state,
        quoteCurrency: action.currency
      };
    case CHANGE_BASE_CURRENCY_INITIAL:
      return {
        ...state,
        baseCurrency: action.currency
      };
    case CHANGE_QUOTE_CURRENCY_INITIAL:
      return {
        ...state,
        quoteCurrency: action.currency
      };
    case CONVERSION_RESULT:
      return {
        ...state,
        rate: !state.baseCurrencyIsFiat
          ? action.result.data.data[state.baseCurrency].quote[
              state.quoteCurrency
            ].price
          : 1 /
            action.result.data.data[state.quoteCurrency].quote[
              state.baseCurrency
            ].price,
        lastUpdated: !state.baseCurrencyIsFiat
          ? action.result.data.data[state.baseCurrency].last_updated
          : action.result.data.data[state.quoteCurrency].last_updated
      };

    case CONVERSION_ERROR:
      return { ...state, error: action.error };
    case CLEAR_ERROR:
      return { ...state, error: null };

    case CRYPTOS_TO_SHOW:
      return { ...state, cryptosToShow: action.number };
    default:
      return state;
  }
};

export default reducer;
