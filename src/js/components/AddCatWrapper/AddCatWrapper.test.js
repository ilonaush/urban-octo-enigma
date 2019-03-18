import React from 'react';
import {AddCatWrapper}  from './AddCatWrapper';
import {Provider} from "react-redux";
import {store} from "../../reducers/index";
import {mount, shallow} from "enzyme/build";
import renderer from "react-test-renderer";
import AddCatForm from "../AddCatForm/AddCatForm";
import {MemoryRouter} from "react-router-dom";



describe('AddCatWrapper', () => {
    it('renders correctly', () => {
        const AddWorkerWrapperComponent = renderer.create(<AddCatWrapper/>);
        expect((AddWorkerWrapperComponent).toJSON()).toMatchSnapshot();
    });

    it('calls submit function  when  the form is submitted', async () => {
        const historyMock = { push: jest.fn() };
        const mockAddCatAction = jest.fn().mockResolvedValue(43);
        const props = {
            addCat: mockAddCatAction,
            history: historyMock
        };
        const AddWorkerWrapperComponent = mount(
            <Provider store={store}>
                <AddCatWrapper {...props}/>
            </Provider>
        );

        const AddWorkerFormComponent = AddWorkerWrapperComponent.find(AddCatForm);
        expect(mockAddCatAction.mock.calls.length).toBe(0);
        AddWorkerFormComponent.simulate('submit');
        expect(mockAddCatAction.mock.calls.length).toBe(1)
    });


});

