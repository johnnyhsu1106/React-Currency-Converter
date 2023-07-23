import React from 'react'

const CurrencyRow = ({
  amount,  
  currencyOptions,
  selectedCurrency,
  onSelectCurrency,
  onChangeAmount
}) => {

  return (
    <>
      <input
        className='input' 
        type='number'
        value={amount}
        onChange={(e) => {onChangeAmount(e.target.value)}} 
      />
      <select 
        value={selectedCurrency}
        onChange={(e) => {onSelectCurrency(e.target.value)}}
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
    </>
  )
}

export default CurrencyRow