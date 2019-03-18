import React from 'react';
import FindHomeForm from './FindHomeForm';
import {mount, } from "enzyme/build";
import renderer from "react-test-renderer";


describe('FindHomeForm', () => {
    it('renders correctly', () => {
        const FireWorkerFormComponent = renderer.create(<FindHomeForm/>);
        expect((FireWorkerFormComponent).toJSON()).toMatchSnapshot();
    });

    it('changes its state on select', () => {
        const FireWorkerFormComponent = mount(
            <FindHomeForm/>
        );

        expect(FireWorkerFormComponent.state('cat')).toEqual(null);
        FireWorkerFormComponent.find('select[name="id"]').simulate('change', {target: { value : '123', name: 'id'}});
        expect(FireWorkerFormComponent.state('cat').id).toEqual('123');
    });
});
