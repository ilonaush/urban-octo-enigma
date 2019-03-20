import React from 'react';
import {MENU_ITEMS} from "../../constants";
import {NavLink} from "react-router-dom";
import "./SidebarMenu.styl";

const SidebarMenu = () => {
  return (
      <ul>
        {MENU_ITEMS.map((link) => {
              return (
                  <li key={link.name}>
                    <NavLink to={link.to}>
                      {link.name}
                    </NavLink>
                  </li>
              )
            }
        )}
      </ul>
  );
};


export default SidebarMenu;
