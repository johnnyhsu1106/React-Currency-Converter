import React from 'react'

const CurrencyInput = ({ amount, onChangeAmount}) => {
  return (
    <input
      className='input' 
      type='number'
      value={amount}
      onChange={(e) => {onChangeAmount(e.target.value)}} 
    />
  )
}

export default CurrencyInput;