import React, { useState, useEffect } from 'react';
import styles from './currency-converter.module.scss';
import { getCurrencies } from '../utils';

import Modal from './modal/modal';
import Dropdown from './dropdown/dropdown';
import Input from './input/input';

import swapIcon from '../assets/swap.svg';
import spinnerIcon from '../assets/spinner.svg';

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

  const handleFromCurrencyChange = (currency: string) => {
    setFromCurrency(currency);
  };

  const handleToCurrencyChange = (currency: string) => {
    setToCurrency(currency);
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
        <section>
          <Input
            amount={amount}
            onAmountChange={handleAmountChange}
          />
        </section>

        <section className={styles['converter']}>
          <Dropdown
            label="From:"
            value={fromCurrency}
            options={currencies}
            onChange={handleFromCurrencyChange}
          />

          <img src={swapIcon} className={styles['swap-icon']} alt="Swap Icon" />

          <Dropdown
            label="To:"
            value={toCurrency}
            options={currencies}
            onChange={handleToCurrencyChange}
          />
        </section>

        <section className={styles['result']}>
          <span>You will receive: <strong>{convertedAmount ? convertedAmount : '...'}</strong> «{toCurrency}»</span>
        </section>

        <button type="submit" disabled={loading}>
          {loading ? (
            <div className={styles['spinner']}>
              <span>Converting...</span>
              <img src={spinnerIcon} alt="Spinner Icon" />
            </div>
          ) : 'Convert'}
        </button>
      </form>

      {showModal && (
        <Modal onClose={closeModal} />
      )}
    </div>
  );
};

export default CurrencyConverter;
