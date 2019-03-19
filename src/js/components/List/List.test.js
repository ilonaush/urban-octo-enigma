import React from 'react';
import List  from './List';
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import { mount, shallow } from 'enzyme';
import ListItem from "../ListItem/ListItem";
import configureMockStore from "redux-mock-store";


const mockStore = configureMockStore();
const store = mockStore({ cats: [
        {id: 1, fullname: 'mike', position: 'cat'},
        {id: 2, fullname: 'mike', position: 'cat'},
        {id: 3, fullname: 'mike', position: 'cat'},
        {id: 4, fullname: 'mike', position: 'cat'}
        ]
});
const emptyStore = mockStore({});

describe('List', function () {

    beforeEach(() => {
        this.wrapper = mount(
            <MemoryRouter keyLength={0}>
                <Provider store={store}>
                    <List/>
                </Provider>
            </MemoryRouter>
        );
    });
    it('renders', () => {
        expect(this.wrapper.find(List)).toMatchSnapshot();
    });

    it('renders as many rows as expected', () => {

        const ListComponent = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <List/>
                </Provider>
            </MemoryRouter>
        );
        expect(ListComponent.find(ListItem).length).toEqual(4);
    });
    it('renders no row when store is empty', () => {

        const ListComponent = mount(
            <MemoryRouter>
                <Provider store={emptyStore}>
                    <List/>
                </Provider>
            </MemoryRouter>
        );
        expect(ListComponent.find(ListItem).length).toEqual(0);
    })
    it('renders button when store is empty', () => {
        const ListComponent = mount(
            <MemoryRouter>
                <Provider store={emptyStore}>
                    <List/>
                </Provider>
            </MemoryRouter>
        );
        expect(ListComponent.find('.home-add-btn').exists()).toEqual(true);
    })
});
