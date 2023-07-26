const CurrencyDropdown = ({
  currencyOptions,
  selectedCurrency,
  onSelectCurrency,
}) => {
  
  return (
    <select
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