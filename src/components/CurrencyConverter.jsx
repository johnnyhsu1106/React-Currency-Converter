import CurrencyRow from './CurrencyRow';
import { useCurrencyContext } from '../context/CurrencyContext';
import style from './CurrencyConverter.module.css';


const CurrencyConverter = () => {
  const {
    isError,
  } = useCurrencyContext();
  
  if (isError) {
    return <p>Something goes wrong</p>
  }

  return (
    <>
      <h1 className='title'>Convert Currency</h1>
      <CurrencyRow isFromRow={true} />
      <div className={style.equals}> = </div>
      <CurrencyRow isFromRow={false} />
    </>
  )
}

export default CurrencyConverter;
