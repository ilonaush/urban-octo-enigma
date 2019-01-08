import React from 'react';

import AddWorkerForm  from './AddWorkerForm';

import ReactDOM from 'react-dom';
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "../../reducers/index";


describe('AddWorkerForm', () => {
    it('renders', () => {

        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><AddWorkerForm/></Provider>, div)
    })
})