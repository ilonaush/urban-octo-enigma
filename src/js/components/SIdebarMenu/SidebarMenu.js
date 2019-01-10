import React, {PureComponent, Component} from 'react';
import PropTypes from 'prop-types';
import {MENU_ITEMS} from "../../constants";
import {Link, NavLink} from "react-router-dom";
import "./SidebarMenu.styl";
import add from "images/add.svg"
import fire from "images/fire.svg"
import list from "images/list.svg"
import gallery from "images/gallery.svg"

const icons = {
    add: add,
    fire: fire,
    list: list,
    gallery: gallery
}

class SidebarMenu extends PureComponent {
    render() {
        return (
            <div>
                <ul>
                    {MENU_ITEMS.map((link) => {
                        return (
                            <li key={link.name}>
                                <NavLink to={link.to}><span className='icon' style={{backgroundImage: `url(${icons[link.icon] })`}} alt=""/>{link.name}</NavLink>
                            </li>
                        )
                        }
                    )}
                </ul>
            </div>
        );
    }
}

SidebarMenu.propTypes = {};

export default SidebarMenu;
