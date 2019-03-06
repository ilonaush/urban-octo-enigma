import React from 'react';
import FireWorkerForm from './FireWorkerForm';
import {mount, shallow} from "enzyme/build";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {store} from "../../reducers";

describe('FireWorkerForm', () => {
    it('renders correctly', () => {
        const FireWorkerFormComponent = renderer.create(<FireWorkerForm/>);
        expect((FireWorkerFormComponent).toJSON()).toMatchSnapshot();
    });

    it('changes its state on select', () => {
        const FireWorkerFormComponent = mount(shallow(
            <Provider store={store}>
                <FireWorkerForm/>
            </Provider>
        ).get(0));
        console.log(FireWorkerFormComponent.state());
        expect(FireWorkerFormComponent.state().workerID).toEqual('');
        FireWorkerFormComponent.find('select').simulate('change', {target: { value : '123'}});
        expect(FireWorkerFormComponent.state().workerID).toEqual('123');
    });
});
