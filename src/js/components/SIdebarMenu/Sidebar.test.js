import React from 'react';
import SidebarMenu  from './SidebarMenu';
import { MemoryRouter } from 'react-router-dom';
import {mount} from "enzyme/build";
import Sidebar from "../Sidebar/Sidebar";
import {NavLink} from "react-router-dom";
import renderer from "react-test-renderer";

describe('SidebarMenu', () => {
    it('render correctly sidebar component', () => {
        const SidebarMenuComponent = renderer.create(
            <MemoryRouter>
                <SidebarMenu/>
            </MemoryRouter>
        ).toJSON();
        expect(SidebarMenuComponent).toMatchSnapshot();
    });

    it('has correct links in navbar', () => {
        const SidebarComponent = mount(
            <MemoryRouter>
                <Sidebar/>
            </MemoryRouter>
        );
        expect(SidebarComponent.find(NavLink).at(1).prop('to')).toEqual('/history');
        expect(SidebarComponent.find(NavLink).at(2).prop('to')).toEqual('/add-cat');
        expect(SidebarComponent.find(NavLink).at(3).prop('to')).toEqual('/find-home');
        expect(SidebarComponent.find(NavLink).at(4).prop('to')).toEqual('/gallery');
    });


});




