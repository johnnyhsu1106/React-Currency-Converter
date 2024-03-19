import CurrencyInput from './CurrencyInput';
import CurrencyDropdown from './CurrencyDropdown';


const CurrencyRow = ({ isFromRow }) => {
  return (
    <>
      <CurrencyInput isFromRow={isFromRow} />
      <CurrencyDropdown isFromRow={isFromRow}/>
    </>
  )
}

export default CurrencyRow