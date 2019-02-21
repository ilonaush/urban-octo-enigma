import React from 'react';
import { Provider } from 'react-redux';
import Layout from "./components/Layout/Layout";
import {store} from "./reducers/index";
import actions from './reducers/actions';


export default class App extends React.Component{
    constructor(props) {
        super(props);
        store.dispatch(actions.getWorkers());
    }
    render() {
        return (
            <Provider store={store}>
                <Layout/>
            </Provider>
        )
    }
}


