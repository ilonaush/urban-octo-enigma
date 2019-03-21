import React from 'react';
import Intro from './Intro';
import {mount} from "enzyme";


describe('Intro', () => {
  it('render correctly intro component', () => {
    const IntroComponent = mount(<Intro/>);
    expect(IntroComponent).toMatchSnapshot();
  });
});


