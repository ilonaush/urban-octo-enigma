import React from 'react';
import {FindHomeWrapper}  from './FindHomeWrapper';
import {Provider} from "react-redux";
import {store} from "../../reducers/index";
import {mount, shallow} from "enzyme/build";
import renderer from "react-test-renderer";
import FindHomeForm from "../FindHomeForm/FindHomeForm";



describe('FindHomeWrapper', () => {
    it('renders correctly', () => {
        const FireWorkerWrapperComponent = renderer.create(<FindHomeWrapper/>);
        expect((FireWorkerWrapperComponent).toJSON()).toMatchSnapshot();
    });

    it('calls submit function  when  the form is submitted', async () => {
        const historyMock = { push: jest.fn() };
        const mockFindHomeAction = jest.fn().mockResolvedValue();
        const props = {
            findHome: mockFindHomeAction,
            history: historyMock
        };
        const FireWorkerWrapperComponent = mount(
            <Provider store={store}>
                <FindHomeWrapper {...props}/>
            </Provider>
        );

        const fireWorkerFormComponent = FireWorkerWrapperComponent.find(FindHomeForm);
        expect(mockFindHomeAction.mock.calls.length).toBe(0);
        fireWorkerFormComponent.simulate('submit');
        expect(mockFindHomeAction.mock.calls.length).toBe(1)
    });


});

