import React from 'react';
import FindHomeForm from './FindHomeForm';
import {shallow} from "enzyme/build";


describe('FindHomeForm', function () {

    beforeEach(() => {
        this.wrapper =  shallow(
            <FindHomeForm/>
        );
    });
    it('renders correctly', () => {
        expect(this.wrapper).toMatchSnapshot();
    });

    it('changes its state on select', () => {
        expect(this.wrapper.state('cat')).toEqual(null);
        this.wrapper.find('select[name="id"]').simulate('change', {target: { value : '123', name: 'id'}});
        expect(this.wrapper.state('cat').id).toEqual('123');
    });
});
