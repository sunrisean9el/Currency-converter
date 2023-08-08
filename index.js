const currencyAmount = document.querySelector("#currency-amount");
const currencySelect = document.querySelector("#currency-select");
const submitBtn = document.querySelector("#submit-btn");
const currencyInfo = document.querySelector("#converted-currency-info");

const createOptions = (...currencies) => {
  currencies.map((currency) => {
    const option = document.createElement("option");
    option.value = currency.mid;
    option.label = currency.code;
    option.textContent = currency.currency;
    return currencySelect.appendChild(option);
  });
};

const findElem = (arr, code) => {
  const value = code;
  return arr.find((elem) => {
    return elem.code == value;
  });
};

const optionsTemplate = (data) => {
  if (!data) return;
  const { rates } = data[0];
  const USD = findElem(rates, "USD");
  const EUR = findElem(rates, "EUR");
  const CHF = findElem(rates, "CHF");
  createOptions(USD, EUR, CHF);
};

const importValuesFromAPI = () => {
  const url = "https://api.nbp.pl/api/exchangerates/tables/a/";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      optionsTemplate(data);
    })
    .catch((err) => console.log.err);
};

const currencyToPLN = () => {
  const currentExchangeRate = currencySelect.value;
  const valueToConvert = currencyAmount.valueAsNumber;
  const countValue = (valueToConvert * currentExchangeRate).toFixed(2);
  return countValue;
};

const showResult = (event) => {
  event.preventDefault();
  const value = currencyAmount.valueAsNumber;
  const result = currencyToPLN();
  if (result != 0) {
    currencyInfo.textContent = `To ${result} PLN.`;
  } else if (value === "") {
    currencyInfo.textContent = "Wpisz kwotę złotówek aby przeliczyć walutę.";
  } else {
    currencyInfo.textContent =
      "Wpisana kwota wynosi 0. Sprawdź wprowadzoną wartość.";
  }
};

const countOnSubmit = () => {
  importValuesFromAPI();
  submitBtn.addEventListener("click", showResult);
};

document.addEventListener("DOMContentLoaded", countOnSubmit);
