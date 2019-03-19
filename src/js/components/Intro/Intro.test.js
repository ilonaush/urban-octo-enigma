import React from 'react';
import Intro from './Intro';
import renderer from 'react-test-renderer';

describe('Intro', () => {
    it('render correctly intro component', () => {
        const IntroComponent = renderer.create(<Intro />).toJSON();
        expect(IntroComponent).toMatchSnapshot();
    });
});


