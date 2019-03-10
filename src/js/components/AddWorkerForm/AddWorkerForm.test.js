import React from 'react';

import AddWorkerForm  from './AddWorkerForm';

import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from "../../reducers/index";
import {mount, shallow} from "enzyme/build";
import renderer from "react-test-renderer";
import Input from "../Input/Input";

describe('AddWorkerForm', () => {
    it('renders correctly', () => {
        const AddWorkerFormComponent = renderer.create(<AddWorkerForm/>);
        expect((AddWorkerFormComponent).toJSON()).toMatchSnapshot();
    })
});

it('calls submit function  when  the form is submitted', () => {
    const handleSubmit = jest.fn(),
          AddWorkerFormComponent = mount(
              <Provider store={store}>
                  <AddWorkerForm handleSubmit={handleSubmit}/>
              </Provider>);

    const button = AddWorkerFormComponent.find('#submit-btn');
    button.simulate('submit');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalled();
});

it('change worker state when  the form is submitted', () => {
    const AddWorkerFormComponent = mount(shallow(
              <Provider store={store}>
                  <AddWorkerForm/>
              </Provider>).get(0));
    const firstInput = AddWorkerFormComponent.find(Input).at(0);
    expect(AddWorkerFormComponent.state().cat.name).toEqual('');
    firstInput.simulate('change', {target: { value: 'mike', name: 'name'}});
    expect(AddWorkerFormComponent.state().cat.name).toEqual('mike');

});




