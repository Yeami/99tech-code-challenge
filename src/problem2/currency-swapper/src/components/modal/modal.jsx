import React from 'react';

import styles from './modal.module.css'

const Modal = ({ onClose }) => {
  return (
    <div className={styles['modal']}>
      <div className={styles['content']}>
        <h2>Success!</h2>
        <p>Conversion completed successfully.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
