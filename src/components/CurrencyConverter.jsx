import CurrencyRow from './CurrencyRow';
import { useCurrencyContext } from '../context/CurrencyContext';
import style from './CurrencyConverter.module.css';


const CurrencyConverter = () => {
  const {
    isLoading,
    isError,
  } = useCurrencyContext();
  
  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something goes wrong</p>
  }

  return (
    <>
      <h1 className='title'>Convert Currency</h1>
      <CurrencyRow type='from' />
      <div className={style.equals}> = </div>
      <CurrencyRow type='to' />
    </>
  )
}

export default CurrencyConverter;
