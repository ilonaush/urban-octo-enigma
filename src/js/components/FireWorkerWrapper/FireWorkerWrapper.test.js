import React from 'react';
import {FireWorkerWrapper}  from './FireWorkerWrapper';
import {Provider} from "react-redux";
import {store} from "../../reducers/index";
import {mount, shallow} from "enzyme/build";
import renderer from "react-test-renderer";
import FireWorkerForm from "../FireWorkerForm/FireWorkerForm";



describe('FireWorkerWrapper', () => {
    it('renders correctly', () => {
        const FireWorkerWrapperComponent = renderer.create(<FireWorkerWrapper/>);
        expect((FireWorkerWrapperComponent).toJSON()).toMatchSnapshot();
    });

    it('calls submit function  when  the form is submitted', () => {
        const mockFireWorkerAction = jest.fn();
        const props = {
            fireWorker: mockFireWorkerAction
        };
        const FireWorkerWrapperComponent = mount(
            <Provider store={store}>
                <FireWorkerWrapper {...props}/>
            </Provider>
        );

        const fireWorkerFormComponent = FireWorkerWrapperComponent.find(FireWorkerForm);
        expect(mockFireWorkerAction.mock.calls.length).toBe(0);
        fireWorkerFormComponent.simulate('submit');
        expect(mockFireWorkerAction.mock.calls.length).toBe(1)
    });


});

