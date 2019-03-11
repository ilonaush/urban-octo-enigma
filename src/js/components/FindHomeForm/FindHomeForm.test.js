import React from 'react';
import FindHomeForm from './FindHomeForm';
import {mount, shallow} from "enzyme/build";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {store} from "../../reducers";

describe('FindHomeForm', () => {
    it('renders correctly', () => {
        const FireWorkerFormComponent = renderer.create(<FindHomeForm/>);
        expect((FireWorkerFormComponent).toJSON()).toMatchSnapshot();
    });

    it('changes its state on select', () => {
        const FireWorkerFormComponent = mount(shallow(
            <Provider store={store}>
                <FindHomeForm/>
            </Provider>
        ).get(0));
        expect(FireWorkerFormComponent.state().catID).toEqual('');
        FireWorkerFormComponent.find('select').simulate('change', {target: { value : '123'}});
        expect(FireWorkerFormComponent.state().catID).toEqual('123');
    });
});
