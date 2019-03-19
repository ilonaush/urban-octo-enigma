import React from 'react';
import {Gallery}  from './Gallery';
import configureMockStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme';

const mockStore = configureMockStore();
const store = mockStore({ cats: [{id: 1, fullname: 'mike', position: 'cat'}] });
const emptyStore = mockStore({});


describe('Gallery',  function () {

    beforeEach(() => {
        this.wrapper = mount(
            <Gallery/>
        );
    });

    it('renders correctly gallery component with mock store', () => {
        expect(this.wrapper).toMatchSnapshot();
    });

    it('renders correctly gallery component with default parameters', () => {
        expect(Array.isArray(this.wrapper.prop('cats'))).toBe(true);
    });

    it('renders correctly gallery component with default parameters', () => {
        expect(this.wrapper.find('.no-cats').text()).toBe('Немає котиків');
    });
});



