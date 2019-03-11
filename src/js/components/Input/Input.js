import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Input extends Component {

    render() {
        const {placeholder, onChange, value, name, className, ...props} = this.props;
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
}

Input.propTypes = {
    value: PropTypes.string
};
Input.defaultProps = {
    value: ''
};

export default Input;
