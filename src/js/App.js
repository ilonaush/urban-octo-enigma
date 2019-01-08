import React from 'react';
import { Provider } from 'react-redux';
import Layout from "./components/Layout/Layout";
import {store} from "./reducers/index";
import {saveStore} from "./services/LocalStorageService";



export default class App extends React.Component{

    render() {
        return (
            <Provider store={store}>
                <Layout/>
            </Provider>
        )
    }
}
