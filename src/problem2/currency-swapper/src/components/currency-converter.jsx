import React, { useState, useEffect } from 'react';
import styles from './currency-converter.module.css';
import { getCurrencies } from '../utils';

import Modal from './modal/modal';

const currencies = getCurrencies();

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('USD');

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  useEffect(() => {
    const fromRate = currencies.find(c => c.currency === fromCurrency)?.price;
    const toRate = currencies.find(c => c.currency === toCurrency)?.price;

    if (fromRate && toRate) {
      const amountInUSD = amount * fromRate;
      const result = amountInUSD / toRate;
      setConvertedAmount(result);
    }
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = (e) => {
    e.preventDefault();
    setLoading(true);

    // API request
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 2000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles['card']}>
      <form onSubmit={convertCurrency}>
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
          {convertedAmount > 0 && (<span>You will receive: {convertedAmount.toFixed(2)} {toCurrency}</span>)}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Converting...' : 'Convert'}
        </button>

        {loading && (
          <div className={styles.spinner}>
            {/* Replace with your spinner component or animation */}
            <span>Loading...</span>
          </div>
        )}
      </form>

      {showModal && (
        <Modal onClose={closeModal} />
      )}
    </div>
  );
};

export default CurrencyConverter;
