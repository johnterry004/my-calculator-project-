const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');

// Fetch available currencies
fetch('https://api.exchangerate-api.com/v4/latest/USD')
  .then(response => response.json())
  .then(data => {
    const rates = data.rates;
    for (const currency in rates) {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.value = currency;
      option1.textContent = currency;
      option2.value = currency;
      option2.textContent = currency;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    }
  });

// Convert currency
function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const convertAmount = amount.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[to];
      const convertedAmount = convertAmount * rate;
      result.textContent = `${convertAmount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
    })
    .catch(error => {
      console.error('Error:', error);
      result.textContent = 'An error occurred or check your internet and Please try again.';
    });
}
