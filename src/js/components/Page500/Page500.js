import React, {Component} from 'react';
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

export default Page500;
