import React from 'react';
import {AddWorkerWrapper}  from './AddWorkerWrapper';
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

    it('calls submit function  when  the form is submitted', async () => {
        const mockAddCatAction = jest.fn().mockResolvedValue(43);
        const props = {
            addCat: mockAddCatAction
        };
        const AddWorkerWrapperComponent = mount(
            <Provider store={store}>
                <AddWorkerWrapper {...props}/>
            </Provider>
        );

        const AddWorkerFormComponent = AddWorkerWrapperComponent.find(AddWorkerForm);
        expect(mockAddCatAction.mock.calls.length).toBe(0);
        AddWorkerFormComponent.simulate('submit');
        expect(mockAddCatAction.mock.calls.length).toBe(1)
    });


});

