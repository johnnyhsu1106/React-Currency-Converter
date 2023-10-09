import CurrencyConverter from './components/CurrencyConverter';
import { CurrencyProvider } from './context/CurrencyContext';
import './App.css';

const App = () => {
  return (
    <CurrencyProvider>
      <CurrencyConverter />
    </CurrencyProvider>

  )
}
export default App;
