import React from 'react';
import ReactDOM from 'react-dom';
import Intro from './Intro';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Intro />, div);
});

it('render correctly intro component', () => {
    const IntroComponent = renderer.create(<Intro />).toJSON();
    expect(IntroComponent).toMatchSnapshot();
});
