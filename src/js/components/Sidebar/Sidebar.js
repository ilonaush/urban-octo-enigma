import React from 'react';
import {Link} from 'react-router-dom';

import './Sidebar.styl';
import SidebarMenu from "../SIdebarMenu/SidebarMenu";

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to='/' className='heading'>
                <span className='icon' style={{backgroundImage: `url('images/add.svg`}} alt=""/>
                Kitty Farm Dashboard
            </Link>
            <SidebarMenu />
        </div>
    );
};

export default Sidebar;
