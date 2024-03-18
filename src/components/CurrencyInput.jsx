import { useCurrencyContext } from '../context/CurrencyContext';
import style from './CurrencyConverter.module.css';


const CurrencyInput = ({ type }) => {
  const {
    fromAmount,
    toAmount,
    handleFromAmountChange,
    handleToAmountChange,
  } = useCurrencyContext();
  
  const isFromRow = type === 'from';
  const amount = isFromRow ? fromAmount : toAmount;
  const handleAmountChange = isFromRow ? handleFromAmountChange : handleToAmountChange;

  return (
    <input
      className={style.input}
      type='number'
      min={0}
      step={1}
      value={amount}
      onChange={(e) => {handleAmountChange(Number(e.target.value))}} 
    />
  )
}

export default CurrencyInput;