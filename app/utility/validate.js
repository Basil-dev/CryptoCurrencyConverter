const validate = text => {
  var regExApiKey = /^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}/;

  if (regExApiKey.test(text)) {
    return true;
  } else return false;
};

export default validate;
