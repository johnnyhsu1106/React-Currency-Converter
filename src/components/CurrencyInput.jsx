import { useCurrencyContext } from '../context/CurrencyContext';
import style from './CurrencyConverter.module.css';


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
      // value={amount}
      onChange={(e) => {handleAmountChange(Number(e.target.value), isFromRow)}} 
    />
  )
}

export default CurrencyInput;