// This function fill the select menu with options from the api
function populateCurrencyOptions() {
  // you can change the initially value by replace word "USD" at the end of URL with any currency that you wish
  fetch("https://api.exchangerate-api.com/v4/latest/USD")
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data.rates); // get the name of the currencies
      const fromSelect = document.getElementById("from");
      const toSelect = document.getElementById("to");

      currencies.forEach((currency) => {
        // iterates through them
        // it creates an <option> element, sets its text and value attributes to the currency code, and appends it to both the from and to select elements.
        const option1 = document.createElement("option");
        option1.text = currency;
        option1.value = currency;
        fromSelect.appendChild(option1);

        const option2 = document.createElement("option");
        option2.text = currency;
        option2.value = currency;
        toSelect.appendChild(option2);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to perform currency conversion
function convert() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("from").value;
  const toCurrency = document.getElementById("to").value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    .then((response) => response.json())
    .then((data) => {
      const exchangeRate = data.rates[toCurrency];
      const convertedAmount = amount * exchangeRate;
      document.getElementById(
        "result"
      ).innerText = `${amount} ${fromCurrency} equals ${convertedAmount.toFixed(
        2
      )} ${toCurrency}`;
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("result").innerText =
        "An error occurred. Please try again later.";
    });
}

// Call the function when the page loads
window.onload = function () {
  populateCurrencyOptions();
};
