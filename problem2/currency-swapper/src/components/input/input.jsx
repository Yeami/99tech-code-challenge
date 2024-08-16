import React from 'react';
import styles from './input.module.scss';

const Input = ({ amount, onAmountChange }) => {
  return (
    <div className={styles['input-block']}>
      <span>Amount you want to exchange</span>
      <input
        type="number"
        placeholder="1000"
        value={amount}
        onChange={onAmountChange}
      />
    </div>
  );
};

export default Input;
