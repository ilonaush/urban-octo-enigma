import React from 'react';
import ContentTitle from './ContentTitle';
import {shallow} from "enzyme/build";

describe('ContentTitle', function () {

  beforeEach(() => {
    this.wrapper = shallow(<ContentTitle>Hello!</ContentTitle>);
  });

  it('renders correctly without children', () => {
    expect(this.wrapper).toMatchSnapshot();
  });

  it('renders correctly with children', () => {
    expect(this.wrapper.text()).toEqual('Hello!');
  });
});
