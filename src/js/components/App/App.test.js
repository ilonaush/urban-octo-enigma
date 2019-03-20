import React from 'react';
import App from './App';
import {shallow} from "enzyme";

describe('App', () => {
  it('renders correctly', () => {
    console.group = jest.fn().mockImplementationOnce(() => {
    });
    const AppComponent = shallow(
        <App/>
    );
    expect(AppComponent).toMatchSnapshot();
  })
});
