import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 text-red-700 p-4 rounded">
    <p>{message}</p>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
