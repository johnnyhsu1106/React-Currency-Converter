import { useCurrencyContext } from '../context/CurrencyContext';
import style from './CurrencyConverter.module.css';
import PropTypes from 'prop-types';

const CurrencyInput = ({ isFromRow }) => {
  const {
    fromAmount,
    toAmount,
    handleAmountChange,
  } = useCurrencyContext();

  return (
    <input
      className={style.input}
      type='number'
      min={0}
      step={1}
      value={ isFromRow ? fromAmount : toAmount }
      onChange={(e) => {handleAmountChange(Number(e.target.value), isFromRow)}} 
    />
  )
};

CurrencyInput.propTypes = {
  isFromRow: PropTypes.bool.isRequired
};

export default CurrencyInput;