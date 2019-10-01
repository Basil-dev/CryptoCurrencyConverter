const alert = (type, language) => {
  if (language === "Russian") {
    switch (type) {
      case "API key is valid":
        return ["success", "ОК", "API ключ действителен."];
      case "API Key is invalid":
        return ["error", "Error", "API ключ недействителен"];
      case "Something went wrong":
        return ["error", "Ошибка", "Что-то пошло не так, попробуйте позже..."];
      default:
        return ["error", "Ошибка", type]
    }
  } else {
    switch (type) {
      case "API key is valid":
        return ["success", "ОК", "API Key is valid."];
      case "API Key is invalid":
        return ["error", "Error", "This API Key is invalid"];
      case "Something went wrong":
        return ["error", "Error", "Something went wrong, try again later..."];
      default:
        return ["error", "Error", type];
    }
  }
};

export default alert;
