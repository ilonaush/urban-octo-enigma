import React from 'react';
import Layout from './Layout';
import {shallow, mount, render} from 'enzyme';
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../reducers/index";
import renderer from "react-test-renderer";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";


describe('Layout', function () {

  beforeEach(() => {
    this.wrapper = mount(
        <MemoryRouter keyLength={0}>
          <Provider store={store}>
            <Layout/>
          </Provider>
        </MemoryRouter>
    );
  });

  it('renders correctly', () => {
    expect(this.wrapper.find(Layout)).toMatchSnapshot();
  });

  it('always renders sidebar and dashboard', () => {
    const props = {
      location: {
        pathname: '/'
      }
    };
    this.wrapper.setProps(props);
    expect(this.wrapper.containsMatchingElement(Sidebar)).toEqual(true);
    expect(this.wrapper.containsMatchingElement(Dashboard)).toEqual(true);

    props.location.pathname = '/fire-worker';
    this.wrapper.setProps(props);

    expect(this.wrapper.containsMatchingElement(Sidebar)).toEqual(true);
    expect(this.wrapper.containsMatchingElement(Dashboard)).toEqual(true);
  })
})
