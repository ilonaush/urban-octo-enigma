import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import './Layout.styl';
import {Route} from "react-router-dom";

class Layout extends Component {
    render() {
        return (
            <div className='layout'>
                <Route component={Sidebar}/>
                <Route component={Dashboard}/>
            </div>
        );
    }
}

Layout.propTypes = {};

export default Layout;
