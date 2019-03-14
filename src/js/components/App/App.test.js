import React from 'react';
import App  from './App';
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../reducers/index";
import renderer from "react-test-renderer";

describe('App', () => {
    it('renders correctly', () => {
        const AppComponent = renderer.create(<MemoryRouter><Provider store={store}><App/></Provider></MemoryRouter>);
        expect((AppComponent).toJSON()).toMatchSnapshot();
    })
});
