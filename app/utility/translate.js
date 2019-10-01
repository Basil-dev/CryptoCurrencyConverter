const translate = (text, language) => {
  if (language === "Russian") {
    switch (text) {
      case "You can get your API key in https://pro.coinmarketcap.com/login/":
        return "Вы можете получить ключ API в https://pro.coinmarketcap.com/login/";
      case "your account at Coinmarketcap.com":
        return "кабинете Coinmarketcap.com";
      case "Please Enter API Key:":
        return "Пожалуйста, введите ключ API:";
      case "Current API Key:":
        return "Текущий ключ API:";
      case "Cryptocurrency Converter":
        return "Конвертер криптовалют";
      case "Reverse Currencies":
        return "Направление обмена";
      case "Update Exchange Rate":
        return "Обновить курс";
      case "Submit":
        return "Ввод";
      case "Blue":
        return "Синяя";
      case "Orange":
        return "Оранжевая";
      case "Green":
        return "Зелёная";
      case "Purple":
        return "Фиолетовая";
      case "Language":
        return "Язык";
      case "Themes":
        return "Темы";
      case "Cryptocurrencies":
        return "Криптовалюты";
      case "Cryptocurrency":
        return "Криптовалюта";
      case "Fiat Currency":
        return "Фиатная валюта";
      case "Enter New API Key":
        return "Ввести новый ключ API";
      case "Show Top 100":
        return "Показывать топ-100";
      case "Show Top 300":
        return "Показывать топ-300";
      case "Show Top 500":
        return "Показывать топ-500";
      case "Show All":
        return "Показывать все";
      default:
        return text;
    }
  } else {
    return text;
  }
};

export default translate;
