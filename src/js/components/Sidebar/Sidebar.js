import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './Sidebar.styl';
import SidebarMenu from "../SIdebarMenu/SidebarMenu";

class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar'>
                <Link to='/' className='heading'>Dashboard</Link>
                <hr/>
                <SidebarMenu />
            </div>
        );
    }
}

Sidebar.propTypes = {};

export default Sidebar;
