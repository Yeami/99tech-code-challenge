import React, {useState} from 'react';

import styles from './dropdown.module.scss';

import arrowUpIcon from '../../assets/arrow-up.svg';
import arrowDownIcon from '../../assets/arrow-down.svg';
import checkIcon from '../../assets/check.svg';

export interface DropdownOption {
  currency: string;
}

export interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
}

export function Dropdown(props: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: DropdownOption) => {
    setIsOpen(false);

    props.onChange(option.currency);
  };

  return (
    <div className={`${styles['dropdown']} ${isOpen ? styles['open'] : ''}`}>
      <span className={styles['label']}>{props.label}</span>
      <div
        className={styles['dropdown-selected']}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles['dropdown-selected-title']}>
          <img
            className={styles['dropdown-selected-icon']}
            src={`/currencies/${props.value}.svg`}
            alt={`${props.value} Icon`}
          />
          {props.value}
        </div>
        {isOpen ? (
          <img src={arrowUpIcon} alt={'Arrow up'}/>
        ) : (
          <img src={arrowDownIcon} alt={'Arrow down'}/>
        )}
      </div>

      {isOpen && (
        <ul className={styles['dropdown-options']}>
          {props.options.map((option, index) => (
            <li
              key={index}
              className={styles['dropdown-option']}
              onClick={() => handleSelect(option)}
            >
              <div className={styles['dropdown-option-title']}>
                <img
                  className={styles['dropdown-option-icon']}
                  src={`/currencies/${option.currency}.svg`}
                  alt={`${option.currency} Icon`}
                />
                {option.currency}{' '}
              </div>
              {props.value === option.currency ? (
                <img src={checkIcon} alt={'Check icon'}/>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
