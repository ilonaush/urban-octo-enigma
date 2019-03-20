import React from 'react';
import Page500 from './Page500';
import {MemoryRouter} from "react-router-dom";
import {shallow} from "enzyme";

describe('Error', () => {
  it('renders correctly', () => {
    const ErrorComponent = shallow(<MemoryRouter keyLength={0}><Page500/></MemoryRouter>);
    expect(ErrorComponent.find(Page500)).toMatchSnapshot();
  })
});
