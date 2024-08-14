import React, { useState, useEffect } from 'react';
import {getCurrencies} from '../utils';

// Helper function to create a rate lookup from the currency data
const createExchangeRates = (data) => {
  const rates = {};
  data.forEach((item) => {
    rates[item.currency] = 1 / item.price;
  });
  return rates;
};

const currencyData = getCurrencies();
const exchangeRates = createExchangeRates(currencyData);

const CurrencyConverter = () => {
  const [amountToSend, setAmountToSend] = useState(null);
  const [amountToReceive, setAmountToReceive] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('USD');

  useEffect(() => {
    if (amountToSend && fromCurrency && toCurrency) {
      const fromRate = exchangeRates[fromCurrency] || 1;
      const toRate = exchangeRates[toCurrency] || 1;

      setAmountToReceive(((amountToSend * fromRate) / toRate));
    } else {
      setAmountToReceive(null);
    }
  }, [amountToSend, fromCurrency, toCurrency]);

  return (
    <div>
      <h1>Currency Converter</h1>

      <form>
        <div>
          <label>
            Amount to Send:
            <input
              type="number"
              value={amountToSend}
              onChange={(e) => setAmountToSend(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            From Currency:
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              {currencyData.map((currency) => (
                <option key={currency.currency} value={currency.currency}>
                  {currency.currency}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            To Currency:
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              {currencyData.map((currency) => (
                <option key={currency.currency} value={currency.currency}>
                  {currency.currency} — {currency.price}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Amount to Receive:
            <input
              type="text"
              value={amountToReceive}
              readOnly
            />
          </label>
        </div>

      </form>

    </div>
  );
};

export default CurrencyConverter;
