import React from 'react';

import App  from './App';

import ReactDOM from 'react-dom';
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "./reducers/index";


describe('App', () => {
    it('renders', () => {

        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter><Provider store={store}><App/></Provider></MemoryRouter>, div)
    })
})