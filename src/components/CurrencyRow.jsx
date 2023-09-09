import CurrencyInput from './CurrencyInput';
import CurrencyDropdown from './CurrencyDropdown';


const CurrencyRow = ({ type }) => {
  return (
    <>
      <CurrencyInput type={type} />
      <CurrencyDropdown type={type}/>
    </>
  )
}

export default CurrencyRow