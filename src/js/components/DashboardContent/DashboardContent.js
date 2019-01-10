import React, {Component, Suspense} from 'react';
import "./DashboardContent.styl";
import List from "../List/List";
import {Route} from "react-router-dom";
import Loader from "../Loader/Loader";
import AddWorkerWrapper from "../AddWorkerWrapper/AddWorkerWrapper";


const AddWorkerForm = React.lazy(() => import(/* webpackChunkName: "addForm" */"components/AddWorkerForm/AddWorkerForm"));
const FireWorkerForm = React.lazy(() => import(/* webpackChunkName: "fireForm" */"components/FireWorkerForm/FireWorkerForm"));
const Gallery = React.lazy(() => import(/* webpackChunkName: "gallery" */"components/Gallery/Gallery.js"));


export class DashboardContent extends Component {


    render() {
        return (
            <div className='d-content'>
                <Route exact path='/' component={List}/>
                <Route  exact path='/add-worker' render={(routeProps) =>  <Suspense fallback={<Loader/>}>
                    <AddWorkerWrapper handleLoading = {this.props.handleLoading} {...routeProps}/></Suspense>}/>
                <Route  exact path='/fire-worker' render={(routeProps) => <Suspense fallback={<Loader/>}>
                    <FireWorkerForm handleLoading = {this.props.handleLoading} {...routeProps}/></Suspense>}/>
                <Route  exact path='/gallery' render={(routeProps) => <Suspense fallback={<Loader/>}>
                    <Gallery handleLoading = {this.props.handleLoading} {...routeProps}/></Suspense>}/>
            </div>
        );
    }
}

DashboardContent.propTypes = {};

export default DashboardContent;
