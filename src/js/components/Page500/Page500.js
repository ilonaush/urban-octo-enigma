import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import './Page500.styl'

class Page500 extends Component {
    render() {
        return (
            <div className='error'>
                Виникла помилка. Спробуйте пізніше
                <div>
                    <NavLink to='/'>На головну</NavLink>
                </div>
            </div>
        );
    }
}

Page500.propTypes = {};

export default Page500;
