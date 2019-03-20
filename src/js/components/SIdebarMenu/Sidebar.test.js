import React from 'react';
import SidebarMenu from './SidebarMenu';
import {MemoryRouter} from 'react-router-dom';
import {mount} from "enzyme/build";
import Sidebar from "../Sidebar/Sidebar";
import {NavLink} from "react-router-dom";
import renderer from "react-test-renderer";

//memoryRouter is breaking the snapshots with the random keys,
//You can also pass key length through keyLength props and keep its value as 0. Ex: keyLength={0}. This will make sure, key doesn't change on each test run.

describe('SidebarMenu', function () {

  beforeEach(() => {
    this.wrapper = mount(
        <MemoryRouter>
          <Sidebar/>
        </MemoryRouter>
    );
  });
  it('render correctly sidebar component', () => {
    expect(this.wrapper.find(Sidebar)).toMatchSnapshot();
  });

  it('has correct links in navbar', () => {
    expect(this.wrapper.find(NavLink).at(1).prop('to')).toEqual('/history');
    expect(this.wrapper.find(NavLink).at(2).prop('to')).toEqual('/add-cat');
    expect(this.wrapper.find(NavLink).at(3).prop('to')).toEqual('/find-home');
    expect(this.wrapper.find(NavLink).at(4).prop('to')).toEqual('/gallery');
  });
});




