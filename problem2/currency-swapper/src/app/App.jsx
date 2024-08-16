import logo from '../assets/logo.svg';
import styles from './App.module.scss'
import CurrencyConverter from '../components/currency-converter';

function App() {
  return (
    <div className={styles['app']}>
      <img src={logo} className={styles['logo']} alt="Logo" />
      <CurrencyConverter/>
      <div className={styles['owner']}>
        By <a href={'https://www.upwork.com/freelancers/~011e01efc6f756d45f'} target={'_blank'}>Mykyta Ivanov</a>
      </div>
    </div>
  );
}

export default App;
