import styles from './CurrencyConverter.module.css';

import React, {useState, useEffect} from 'react';
import {getCurrencies} from '../utils';

const currencies = getCurrencies();

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('USD');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const convertCurrency = (e) => {
    e.preventDefault();

    console.log('Convert request');
  };

  useEffect(() => {
    const fromRate = currencies.find(c => c.currency === fromCurrency)?.price;
    const toRate = currencies.find(c => c.currency === toCurrency)?.price;

    if (!fromRate || !toRate) {
      return;
    }

    const amountInUSD = amount * fromRate;
    const result = amountInUSD / toRate;

    console.log(result);
    setConvertedAmount(result);
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className={styles['card']}>

      <form onSubmit={(e) => convertCurrency(e)}>
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
          </label>
        </div>

        <div>
          <label>
            From:
            <select value={fromCurrency} onChange={handleFromCurrencyChange}>
              {currencies.map(currency => (
                <option key={currency.currency} value={currency.currency}>
                  {currency.currency}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            To:
            <select value={toCurrency} onChange={handleToCurrencyChange}>
              {currencies.map(currency => (
                <option key={currency.currency} value={currency.currency}>
                  {currency.currency}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          {
            convertedAmount ? (
              <span>You will receive: {convertedAmount} {toCurrency}</span>
            ) : null
          }
        </div>

        <button type="submit">Convert</button>
      </form>

    </div>
  );
};

export default CurrencyConverter;
