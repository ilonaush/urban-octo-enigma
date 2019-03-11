import React, {Component} from 'react';
import "./DashboardContent.styl";
import {Route} from "react-router-dom";
import DynamicComponent from "../../tools/DynamicImport";

export class DashboardContent extends Component {

    render() {
        return (
            <div className='d-content'>
                <Route  exact path='/'
                        render={(routeProps) => <DynamicComponent component='List'  {...routeProps}/>}/>
                <Route  exact path='/add-cat'
                        render={(routeProps) => <DynamicComponent component='AddCatWrapper'  {...routeProps}/>}/>
                <Route  exact path='/find-home'
                        render={(routeProps) => <DynamicComponent component='FindHomeWrapper'  {...routeProps}/>}/>
                <Route  exact path='/gallery'
                        render={(routeProps) => <DynamicComponent component='Gallery'  {...routeProps}/>}/>
                <Route  exact path='/500'
                        render={(routeProps) => <DynamicComponent component='Page500' {...routeProps}/>}
                />
            </div>
        );
    }
}

DashboardContent.propTypes = {};

export default DashboardContent;
