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
  const onChangeAmount = isFromRow ? handleFromAmountChange : handleToAmountChange;

  return (
    <input
      className={style.input}
      type='number'
      value={amount}
      onChange={(e) => {onChangeAmount(Number(e.target.value))}} 
    />
  )
}

export default CurrencyInput;