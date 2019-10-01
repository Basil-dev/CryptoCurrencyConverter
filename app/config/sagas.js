import { takeEvery, select, call, put } from "redux-saga/effects";
import getLatestRate from "../utility/request";
import { AsyncStorage } from "react-native";

import {
  CHANGE_BASE_CURRENCY,
  CHANGE_QUOTE_CURRENCY,
  CONVERSION_RESULT,
  CONVERSION_ERROR,
  UPDATE_RATE,
  SWAP_CURRENCY
} from "../actions/currencies";

import { UI_START_LOADING, UI_STOP_LOADING } from "../actions/settings";

function* fetchLatestConversionRates() {
  const baseCurrencyIsFiat = yield select(
    state => state.currencies.baseCurrencyIsFiat
  );

  const apiKey = yield select(state => state.settings.apiKey);

  yield put({
    type: UI_START_LOADING
  });

  try {
    let baseCurrency;
    let quoteCurrency;

    if (!baseCurrencyIsFiat) {
      baseCurrency = yield select(state => state.currencies.baseCurrency);
      quoteCurrency = yield select(state => state.currencies.quoteCurrency);
    }

    if (baseCurrencyIsFiat) {
      baseCurrency = yield select(state => state.currencies.quoteCurrency);
      quoteCurrency = yield select(state => state.currencies.baseCurrency);
    }

    const response = yield call(
      getLatestRate,
      baseCurrency,
      quoteCurrency,
      apiKey
    );
    const result = yield response;

    if (result.error) {
      yield put({ type: CONVERSION_ERROR, error: result.error });
    } else {
      yield put({ type: CONVERSION_RESULT, result });
    }
  } catch (error) {
    yield put({
      type: CONVERSION_ERROR,
      error: error.response.data.status.error_message
    });
  }

  yield put({
    type: UI_STOP_LOADING
  });
}

function* swapCurrency() {
  baseCurrencyIsFiat = yield select(
    state => state.currencies.baseCurrencyIsFiat
  );
  baseCurrency = yield select(state => state.currencies.baseCurrency);
  quoteCurrency = yield select(state => state.currencies.quoteCurrency);

  if (baseCurrencyIsFiat) {
    yield AsyncStorage.setItem("@baseCurrency", quoteCurrency);
    yield AsyncStorage.setItem("@quoteCurrency", baseCurrency);
  }
}

export default function* rootSaga() {
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(CHANGE_QUOTE_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(UPDATE_RATE, fetchLatestConversionRates);
  yield takeEvery(CHANGE_BASE_CURRENCY, swapCurrency);
  yield takeEvery(CHANGE_QUOTE_CURRENCY, swapCurrency);
  yield takeEvery(SWAP_CURRENCY, swapCurrency);
}
