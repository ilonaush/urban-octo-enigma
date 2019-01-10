import React from 'react';

import {AddWorkerWrapper}  from './AddWorkerWrapper';

import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from "../../reducers/index";
import {mount, shallow} from "enzyme/build";
import renderer from "react-test-renderer";
import AddWorkerForm from "../AddWorkerForm/AddWorkerForm";



describe('AddWorkerWrapper', () => {
    it('renders correctly', () => {
        const AddWorkerWrapperComponent = renderer.create(<AddWorkerWrapper/>);
        expect((AddWorkerWrapperComponent).toJSON()).toMatchSnapshot();
    });

    it('calls submit function  when  the form is submitted', () => {
        const mockEmployWorkerAction = jest.fn();
        console.log(store);
        const props = {
            actions: {
                employWorker: mockEmployWorkerAction
            }
        };
        const AddWorkerWrapperComponent = mount(<Provider store={store}><AddWorkerWrapper/></Provider>);
        console.log(AddWorkerWrapperComponent.props());

        // const AddWorkerFormComponent = AddWorkerWrapperComponent.find(AddWorkerForm);
        // expect(mockEmployWorkerAction.mock.calls.length).toBe(0)
        // AddWorkerFormComponent.simulate('submit');
        // console.log(AddWorkerWrapperComponent.props());
        // expect(mockEmployWorkerAction.mock.calls.length).toBe(1)
    });
});

