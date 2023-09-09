import { useCurrencyContext } from '../context/CurrencyContext';
import style from './CurrencyConverter.module.css';


const CurrencyDropdown = ({ type }) => {
  const {
    currencyOptions,
    fromCurrency,
    toCurrency,
    handleFromCurrencySelect,
    handleToCurrencySelect,
  } = useCurrencyContext();
  
  const isFromRow = type === 'from';
  const selectedCurrency = isFromRow ? fromCurrency : toCurrency;
  const onSelectCurrency = isFromRow ? handleFromCurrencySelect : handleToCurrencySelect;
  
  return (
    <select
      className={style.options}
      value={selectedCurrency}
      onChange={(e) => { onSelectCurrency(e.target.value) }}
    >

      {currencyOptions.map((currencyOption) => {
        return (
          <option
            key={currencyOption}
            value={currencyOption}
          >
            {currencyOption}
          </option>
        )
      })
      }
    </select>
  )
}

export default CurrencyDropdown