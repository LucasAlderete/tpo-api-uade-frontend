import { Form, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FormField = ({ label, type, name, value, onChange, placeholder, error, options }) => (
 <Form.Group className="mb-3 text-start">
   <Form.Label>{label}</Form.Label>
   {type === 'select' ? (
     <Form.Select
       name={name}
       value={value}
       onChange={onChange}
       className="shadow-sm"
     >
       <option value="" disabled>{placeholder}</option>
       {options && options.map((option, index) => (
         <option key={index} value={option.value}>
           {option.label}
         </option>
       ))}
     </Form.Select>
   ) : (
     <Form.Control
       type={type}
       name={name}
       value={value}
       onChange={onChange}
       placeholder={placeholder}
       className="shadow-sm"
     />
   )}
   {error && <Alert variant="danger">{error}</Alert>}
 </Form.Group>
);

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired, // Tipo de input (text, email, etc.)
    name: PropTypes.string.isRequired, // Nombre del campo
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Valor puede ser string o number
    onChange: PropTypes.func.isRequired, // Manejador de eventos para cambios en el campo
    placeholder: PropTypes.string, // Texto de ayuda en el campo (opcional)
    error: PropTypes.string, // Mensaje de error opcional
    options: PropTypes.arrayOf( // Opciones para un campo select, por ejemplo (opcional)
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      })
    )
  };


export default FormField;


