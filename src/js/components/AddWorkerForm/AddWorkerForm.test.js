import React from 'react';

import AddWorkerForm  from './AddWorkerForm';

import ReactDOM from 'react-dom';
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "../../reducers/index";
import {mount} from "enzyme/build";
import {Gallery} from "../Gallery/Gallery";
import sinon from 'sinon';


describe('AddWorkerForm', () => {
    it('renders', () => {

        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><AddWorkerForm/></Provider>, div)
    })
});

it('calls submit function  when  the form is submitted', () => {
        const AddWorkerForm = mount(<Provider store={store}><AddWorkerForm/></Provider>);
        const onSubmit = sinon.spy();
        const wrapper = mount(
            <form onSubmit={onSubmit} />
        );
        const button = AddWorkerForm.find('#submit-btn');
        button.simulate('submit');
});


