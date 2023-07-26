import CurrencyInput from './CurrencyInput';
import CurrencyDropdown from './CurrencyDropdown';


const CurrencyRow = ({
  amount,  
  currencyOptions,
  selectedCurrency,
  onSelectCurrency,
  onChangeAmount
}) => {

  return (
    <>
      <CurrencyInput
        amount={amount}
        onChangeAmount={onChangeAmount} 
      />

      <CurrencyDropdown 
        selectedCurrency={selectedCurrency}
        currencyOptions={currencyOptions}
        onSelectCurrency={onSelectCurrency}
      />
    </>
  )
}

export default CurrencyRow