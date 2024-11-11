import PropTypes from "prop-types";

const ErrorComponent = ({ message }) => {
  return (
    <div className="alert alert-danger" role="alert">
      <strong>Error!</strong> {message}
    </div>
  );
};

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired,
};
export default ErrorComponent;
