import { createContext, useContext, useState, useEffect } from 'react';

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
};
const DEFAULT_FROM_CURRENCY = 'USD';
const DEFAULT_TO_CURRENCY = 'TWD';
const FIX_DECIMAL = 6;

const CurrencyContext = createContext(null)

const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (context === null) {
    throw new Error('useCurrencyContext must be used within CurrencyProvder');
  }
  return context;
};

const CurrencyProvider = ({ children }) => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState(DEFAULT_FROM_CURRENCY);
  const [toCurrency, setToCurrency] = useState(DEFAULT_TO_CURRENCY);
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isAmountChangedInFromCurrency, setIsAmountChangedInFromCurrency] = useState(true);
  const [isError, setIsError] = useState(false);

  // Get Derived States
  const fromAmount = isAmountChangedInFromCurrency ? amount : (amount / exchangeRate).toFixed(FIX_DECIMAL); 
  const toAmount = isAmountChangedInFromCurrency ? (amount * exchangeRate).toFixed(FIX_DECIMAL) : amount;
  
  // Get Currency Options at page load
  useEffect(() => {
    setIsError(false);

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
      setIsError(true);
      console.error(err);
    })
  }, []);

  // Get Exchange at first and Update Exchange Rate if fromCurrency or toCurrency is changed.
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
        
    setIsError(false);

    fetch(`${BASE_URL}/latest?base=${fromCurrency}&symbols=${toCurrency}`, {...REQUEST_BODY, signal })
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
        if (err.name === 'AbortError') {
          return;
        }
        setIsError(true);
        console.error(err);
      })
    
      return () => {
        controller.abort();
      }

  }, [fromCurrency, toCurrency]);

  const handleCurrencySelect = (currency, isFromRow) => {
    if (isFromRow) {
      setFromCurrency(currency);
    } else {
      setToCurrency(currency);
    }
  };

  const handleAmountChange = (amount, isFromRow) => {
    setAmount(amount);
    setIsAmountChangedInFromCurrency(isFromRow);
  };
  
  const value = {
    isError,
    currencyOptions,
    fromAmount,
    fromCurrency,
    toAmount,
    toCurrency,
    handleCurrencySelect,
    handleAmountChange
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider> 
  )
}

export { useCurrencyContext, CurrencyProvider };