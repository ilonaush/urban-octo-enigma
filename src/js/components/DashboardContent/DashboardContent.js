import React, {Component, Suspense} from 'react';
import "./DashboardContent.styl";
import {Route} from "react-router-dom";
import DynamicComponent from "../../tools/DynamicImport";
import Page500 from "../Page500/Page500";


export class DashboardContent extends Component {


    render() {
        return (
            <div className='d-content'>
                <Route  exact path='/'
                        render={(routeProps) => <DynamicComponent component='List'  {...routeProps}/>}
                />
                <Route  exact path='/add-worker'
                        render={(routeProps) => <DynamicComponent component='AddWorkerWrapper'  {...routeProps}/>}
                />
                <Route  exact path='/fire-worker'
                        render={(routeProps) => <DynamicComponent component='FireWorkerWrapper'  {...routeProps}/>}
                />
                <Route  exact path='/gallery'
                        render={(routeProps) => <DynamicComponent component='Gallery'  {...routeProps}/>}
                />
                <Route  exact path='/500'
                        render={(routeProps) => <Page500 {...routeProps}/>}
                />
            </div>
        );
    }
}

DashboardContent.propTypes = {};

export default DashboardContent;
