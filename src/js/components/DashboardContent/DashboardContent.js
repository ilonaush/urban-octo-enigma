import React from 'react';
import "./DashboardContent.styl";
import {Route} from "react-router-dom";
import DynamicComponent from "../../tools/DynamicImport";

const DashboardContent = () =>  {
    return (
        <div className='d-content'>
            <Route  exact path='/'
                    render={(routeProps) => <DynamicComponent component='List'  {...routeProps}/>}/>
            <Route  exact path='/add-cat'
                    render={(routeProps) => <DynamicComponent component='AddCatWrapper'  {...routeProps}/>}/>
            <Route  exact path='/find-home'
                    render={(routeProps) => <DynamicComponent component='FindHomeWrapper'  {...routeProps}/>}/>
            <Route  exact path='/cat/:id'
                    render={(routeProps) => <DynamicComponent component='CatPage'  {...routeProps}/>}/>
            <Route  exact path='/gallery'
                    render={(routeProps) => <DynamicComponent component='Gallery'  {...routeProps}/>}/>
            <Route  exact path='/500'
                    render={(routeProps) => <DynamicComponent component='Page500' {...routeProps}/>}
            />
        </div>
    );
};

export default DashboardContent;
