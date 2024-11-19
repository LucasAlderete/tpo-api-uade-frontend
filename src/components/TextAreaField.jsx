import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const TextAreaField = ({ label, name, value, onChange, placeholder }) => {
  return (
    <Form.Group className="mb-3 text-start">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
      />
    </Form.Group>
  );
};

TextAreaField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  };

export default TextAreaField;