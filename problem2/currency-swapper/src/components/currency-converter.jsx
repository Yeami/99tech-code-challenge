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

  const [inputError, setInputError] = useState('');
  const [dropdownError, setDropdownError] = useState('');

  const handleAmountChange = (e) => {
    if (inputError) {
      setInputError('');
    }

    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (currency: string) => {
    if (dropdownError) {
      setDropdownError('');
    }

    setFromCurrency(currency);
  };

  const handleToCurrencyChange = (currency: string) => {
    if (dropdownError) {
      setDropdownError('');
    }

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

    if (amount <= 0) {
      setInputError('Please enter a valid amount greater than 0');
      return;
    }

    if (fromCurrency === toCurrency) {
      setDropdownError('Please select different currencies for conversion');
      return;
    }

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
          {inputError && (
            <div className={styles['error']}>
              <span>{inputError}</span>
            </div>
          )}
        </section>

        <section className={styles['converter']}>
          <Dropdown
            label="From:"
            value={fromCurrency}
            options={currencies}
            onChange={handleFromCurrencyChange}
          />

          <img src={swapIcon} className={styles['swap-icon']} alt="Swap Icon"/>

          <Dropdown
            label="To:"
            value={toCurrency}
            options={currencies}
            onChange={handleToCurrencyChange}
          />
        </section>
        {dropdownError && (
          <div className={styles['error']}>
            <span>{dropdownError}</span>
          </div>
        )}

        <section className={styles['result']}>
          <span>You will receive: <strong>{convertedAmount ? convertedAmount : '...'}</strong> «{toCurrency}»</span>
        </section>

        <button type="submit" disabled={loading}>
          {loading ? (
            <div className={styles['spinner']}>
              <span>Converting...</span>
              <img src={spinnerIcon} alt="Spinner Icon"/>
            </div>
          ) : 'Convert'}
        </button>
      </form>

      {showModal && (
        <Modal onClose={closeModal}/>
      )}
    </div>
  );
};

export default CurrencyConverter;
