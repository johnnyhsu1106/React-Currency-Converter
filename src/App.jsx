import { useEffect, useState } from 'react'
import CurrencyRow from './CurrencyRow'

import './App.css'

const BASE_URL = 'https://api.apilayer.com/exchangerates_data';
const API_KEY = import.meta.env.VITE_API_TOKEN;
const REQUEST_BODY = {
  method: 'GET',
  redirect: 'follow',
  credentials: 'include',
  headers: {
    'content-type': 'application/json; charset=UTF-8',
    'apikey': API_KEY
  }
}

const App = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('TWD');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  // Get Derived States
  const fromAmount = amountInFromCurrency ? amount : amount / exchangeRate; 
  const toAmount = amountInFromCurrency ? amount * exchangeRate : amount;

  // Get Initial Exchange Rate 
  useEffect(() => {
    fetch(`${BASE_URL}/latest?base=${fromCurrency}&symbols=${toCurrency}`, REQUEST_BODY)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Invalid Https Request');
      }
      return res.json();
    })
    .then((data) => {
      const { rates } = data;
      setExchangeRate(rates[toCurrency]);
    })
    .catch((err) => {
      console.error(err);
    })
  }, []);

  // Get Currency Options 
  useEffect(() => {
    fetch(`${BASE_URL}/symbols`, REQUEST_BODY)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Invalid Https Request');
      }
      return res.json();
    })
    .then((data) => {
      const { symbols } = data;
      const currencies = Object.keys(symbols);
      setCurrencyOptions(currencies);
    })
    .catch((err) => {
      console.error(err);
    })
  }, []);

  // Update Exchange Rate if fromCurrency or toCurrency is changed.
  useEffect(() => {
    if (fromCurrency === null || toCurrency === null) {
      return;
    }

    fetch(`${BASE_URL}/latest?base=${fromCurrency}&symbols=${toCurrency}`, REQUEST_BODY)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Invalid Https Request');
        }
        return res.json();
      })
      .then((data) => {
        const { rates } = data;
        setExchangeRate(rates[toCurrency]);
      })
      .catch((err) => {
        console.error(err);
      })

  }, [fromCurrency, toCurrency]);


  const handleFromCurrencySelect = (currency) => {
    setFromCurrency(currency);
  };

  const handleToCurrencySelect = (currency) => {
    setToCurrency(currency);
  };

  const handleFromAmountChange = (amount) => {
    setAmount(amount);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (amount) => {
    setAmount(amount);
    setAmountInFromCurrency(false);
  };
  

  return (
    <>
      <h1>Convert Currency</h1>

      <CurrencyRow
        amount={fromAmount}
        selectedCurrency={fromCurrency}
        currencyOptions={currencyOptions}
        onSelectCurrency={handleFromCurrencySelect}
        onChangeAmount={handleFromAmountChange}
      />
      
      <div className='equals'> = </div>

      <CurrencyRow
        amount={toAmount}   
        selectedCurrency={toCurrency}
        currencyOptions={currencyOptions}
        onSelectCurrency={handleToCurrencySelect}
        onChangeAmount={handleToAmountChange}
      />

    </>
  )
}
export default App;
