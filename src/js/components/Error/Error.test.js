import React from 'react';
import Error  from './Error';
import {MemoryRouter} from "react-router";
import renderer from "react-test-renderer";


describe('Error', () => {
    it('renders correctly', () => {
        const ErrorComponent = renderer.create(<MemoryRouter><Error/></MemoryRouter>);
        expect((ErrorComponent).toJSON()).toMatchSnapshot();
    })
});