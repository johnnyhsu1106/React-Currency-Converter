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

const CurrencyContext = createContext()

const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrencyContext must be used within CurrencyProvder');
  }
  return context;
};

const CurrencyProvider = ({ children }) => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('TWD');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Get Derived States
  const fromAmount = amountInFromCurrency ? amount : amount / exchangeRate; 
  const toAmount = amountInFromCurrency ? amount * exchangeRate : amount;


  // Get Currency Options 
  useEffect(() => {
    setIsLoading(true);
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
    .finally(() => {
      setIsLoading(false);
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
  
  const value = {
    isLoading,
    isError,
    currencyOptions,
    fromAmount,
    fromCurrency,
    toAmount,
    toCurrency,
    handleFromCurrencySelect,
    handleFromAmountChange,
    handleToCurrencySelect,
    handleToAmountChange,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider> 
  )
}

export { useCurrencyContext, CurrencyProvider };