import React from 'react';
import PropTypes from 'prop-types';

const Input = ({placeholder, onChange, value, name, className, ...props}) => {
  return (
      <input className={className}
             placeholder={placeholder}
             onChange={onChange}
             value={value}
             name={name}
             {...props}
      />
  );
}

Input.propTypes = {
  value: PropTypes.string
};
Input.defaultProps = {
  value: '',
  onChange: () => {
  }
};


export default Input;
