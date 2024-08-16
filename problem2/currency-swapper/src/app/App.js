import logo from '../assets/logo.svg';
import styles from './App.module.scss'
import CurrencyConverter from '../components/currency-converter';

function App() {
  return (
    <div className={styles['app']}>
      <img src={logo} className={styles['logo']} alt="Logo" />
      <CurrencyConverter/>
    </div>
  );
}

export default App;
