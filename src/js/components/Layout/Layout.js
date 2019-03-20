import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import {Route} from "react-router-dom";

const Layout = () => {
  return (
      <div className='layout'>
        <Route component={Sidebar}/>
        <Route component={Dashboard}/>
      </div>
  );
}

Layout.propTypes = {};

export default Layout;
