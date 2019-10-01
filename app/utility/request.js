import axios from "axios";

const getLatestRate = (baseCurrency, quoteCurrency, apiKey) =>
  axios.get(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${baseCurrency}&convert=${quoteCurrency}`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
        Accept: "application/json"
      }
    }
  );

export default getLatestRate;
