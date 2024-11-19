import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Search = ({ onSearch, onSearchClick }) => {
  return (
    <InputGroup className="mb-3" style={{ maxWidth: '300px'}}>
      <FormControl
        placeholder="Buscar producto"
        aria-label="Buscar producto"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Button variant="outline-secondary" onClick={onSearchClick}>
        <FaSearch />
      </Button>
    </InputGroup>
  );
};

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onSearchClick: PropTypes.func.isRequired,
};

export default Search;