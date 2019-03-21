import React from 'react';
import Sidebar from './Sidebar';
import {NavLink} from "react-router-dom";
import {shallow} from "enzyme";
import SidebarMenu from "../SIdebarMenu/SidebarMenu";

describe('Sidebar', function () {
  beforeEach(() => {
    this.wrapper = shallow(
        <Sidebar/>
    )
  });
  it('renders without crashing', () => {
    expect(this.wrapper).toMatchSnapshot();
  });

  it('renders correctly with links', () => {
    expect(this.wrapper.children(SidebarMenu).dive().find(NavLink).length).toEqual(5);
  });
})





