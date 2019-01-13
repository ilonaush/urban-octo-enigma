import React from 'react';
import { Provider } from 'react-redux';
import Layout from "./components/Layout/Layout";
import {store} from "./reducers/index";
import RequestService from "./services/RequestService";
import actions from './reducers/actions';

async function fetchWorkers() {
    const {data: workers} = await RequestService.get('/');
    console.log(workers);
    store.dispatch(actions.getWorkers(workers.workers));
}


export default class App extends React.Component{
    constructor(props) {
        super(props);
        fetchWorkers();
    }
    render() {
        return (
            <Provider store={store}>
                <Layout/>
            </Provider>
        )
    }
}


