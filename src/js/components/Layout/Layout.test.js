import React from 'react';

import Layout  from './Layout';

import ReactDOM from 'react-dom';
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "../../reducers/index";


describe('DashboardContent', () => {
    it('renders', () => {

        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter><Provider store={store}><Layout/></Provider></MemoryRouter>, div)
    })
})