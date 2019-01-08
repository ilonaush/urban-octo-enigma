import React from 'react';

import Dashboard  from './Dashboard';

import ReactDOM from 'react-dom';
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "../../reducers/index";


describe('Dashboard', () => {
    it('renders', () => {

        const div = document.createElement('div');
        const location = { pathname: '/' };
        ReactDOM.render(<MemoryRouter><Provider store={store}><Dashboard location={location}/></Provider></MemoryRouter>, div)
    })
})