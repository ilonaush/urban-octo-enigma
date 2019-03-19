import React from 'react';
import Loader from './Loader';
import renderer from "react-test-renderer";

describe('Loader', () => {
    it('render correctly loader component', () => {
        const LoaderComponent = renderer.create(<Loader/>).toJSON();
        expect(LoaderComponent).toMatchSnapshot();
    });
});
