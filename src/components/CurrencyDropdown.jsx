import { useCurrencyContext } from '../context/CurrencyContext';
import style from './CurrencyConverter.module.css';
import PropTypes from 'prop-types';

const CurrencyDropdown = ({ isFromRow }) => {
  const {
    currencyOptions,
    fromCurrency,
    toCurrency,
    handleCurrencySelect
  } = useCurrencyContext();
  
  return (
    <select
      className={style.options}
      value = { isFromRow ? fromCurrency : toCurrency }
      onChange={(e) => { handleCurrencySelect(e.target.value, isFromRow) }}
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
};

CurrencyDropdown.propTypes = {
  isFromRow: PropTypes.bool.isRequired
};

export default CurrencyDropdown