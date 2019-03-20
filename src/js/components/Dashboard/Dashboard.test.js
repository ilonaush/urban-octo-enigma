import React from 'react';
import {Dashboard} from './Dashboard';
import Intro from "../Intro/Intro";
import {shallow} from 'enzyme';
import Loader from "../Loader/Loader";

describe('Dashboard', function () {

  beforeEach(() => {
    this.wrapper = shallow(
        <Dashboard location={{}}/>
    );
  });

  it('renders correctly', () => {
    const location = {pathname: '/'};
    this.wrapper.setProps({location});
    expect(this.wrapper).toMatchSnapshot();
  });

  it('renders correctly page info', () => {
    const props = {
      location: {pathname: '/add-cat'}
    };
    this.wrapper.setProps(props);
    const pageTitle = this.wrapper.find(Intro).children();
    expect(pageTitle.text()).toEqual('Cat registration');
  });

  it('has loader when such prop is submitted', () => {
    const props = {
      loading: true,
      location: {pathname: '/add-cat'}
    };
    this.wrapper.setProps(props);
    expect(this.wrapper.containsMatchingElement(Loader)).toBeTruthy();
  })
});

