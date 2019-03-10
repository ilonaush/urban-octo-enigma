import React from 'react';
import DashboardContent  from './DashboardContent';
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../reducers/index";
import renderer from "react-test-renderer";

describe('DashboardContent', () => {
    it('renders correctly', () => {
        const DashboardContentComponent = renderer.create(
            <MemoryRouter>
                <Provider store={store}>
                    <DashboardContent/>
                </Provider>
            </MemoryRouter>
        );
        expect((DashboardContentComponent).toJSON()).toMatchSnapshot();
    });
});

