import React from 'react';
import Page500  from './Page500';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";


describe('Error', () => {
    it('renders correctly', () => {
        const ErrorComponent = renderer.create(<MemoryRouter><Page500/></MemoryRouter>);
        expect((ErrorComponent).toJSON()).toMatchSnapshot();
    })
});
