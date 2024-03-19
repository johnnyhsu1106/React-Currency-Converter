import CurrencyInput from './CurrencyInput';
import CurrencyDropdown from './CurrencyDropdown';
import PropTypes from 'prop-types';


const CurrencyRow = ({ isFromRow }) => {
  return (
    <>
      <CurrencyInput isFromRow={isFromRow} />
      <CurrencyDropdown isFromRow={isFromRow}/>
    </>
  )
};

CurrencyRow.propTypes = {
  isFromRow: PropTypes.bool.isRequired
};

export default CurrencyRow