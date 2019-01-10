import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './Sidebar';
import {MemoryRouter} from "react-router";
import renderer from 'react-test-renderer';
import {NavLink} from "react-router-dom";
import {mount} from "enzyme";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><Sidebar /></MemoryRouter>, div);
});

it('renders correctly with links', () => {
    const SidebarComponent = mount(<MemoryRouter><Sidebar/></MemoryRouter>);
    console.log(SidebarComponent.find(NavLink).length);
    expect(SidebarComponent.find(NavLink).length).toEqual(4);
});
