import React from 'react';
import Loader from './Loader';
import {shallow} from "enzyme";

describe('Loader', () => {
  it('render correctly loader component', () => {
    const LoaderComponent = shallow(<Loader/>);
    expect(LoaderComponent).toMatchSnapshot();
  });
});
