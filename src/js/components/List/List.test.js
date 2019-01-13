import React from 'react';
import List  from './List';
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import ListItem from "../ListItem/ListItem";
import configureMockStore from "redux-mock-store";


const mockStore = configureMockStore();
const store = mockStore({ workers: [
        {id: 1, fullname: 'mike', position: 'cat'},
        {id: 2, fullname: 'mike', position: 'cat'},
        {id: 3, fullname: 'mike', position: 'cat'},
        {id: 4, fullname: 'mike', position: 'cat'}
        ]
});
const emptyStore = mockStore({});

describe('List', () => {
    it('renders', () => {
        const ListComponent = renderer.create(<MemoryRouter><Provider store={store}><List/></Provider></MemoryRouter>).toJSON();
        expect(ListComponent).toMatchSnapshot();
    });

    it('renders as many rows as expected', () => {

        const ListComponent = mount(<MemoryRouter><Provider store={store}><List/></Provider></MemoryRouter>);
        expect(ListComponent.find(ListItem).length).toEqual(4);
    });
    it('renders no rown when store is emprty', () => {

        const ListComponent = mount(<MemoryRouter><Provider store={emptyStore}><List/></Provider></MemoryRouter>);
        expect(ListComponent.find(ListItem).length).toEqual(0);
    })
});