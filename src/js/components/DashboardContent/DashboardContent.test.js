import React from 'react';

import DashboardContent  from './DashboardContent';

import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "../../reducers/index";
import renderer from "react-test-renderer";
import AddWorkerWrapper from "../AddWorkerWrapper/AddWorkerWrapper";
import { shallow, mount, render } from 'enzyme';



describe('DashboardContent', () => {
    it('renders correctly', () => {
        const DashboardContentComponent = renderer.create(<MemoryRouter><Provider store={store}><DashboardContent/></Provider></MemoryRouter>);
        expect((DashboardContentComponent).toJSON()).toMatchSnapshot();
    });
    it('renders correctly the child component based on route', () => {
        const props = {
            location: {
                pathname: '/add-worker',
                match: {
                    isExact: true, path: "/add-worker", url: ""
                }
            }
        };
        const DashboardContentComponent = mount(<MemoryRouter><Provider store={store}><DashboardContent {...props}/></Provider></MemoryRouter>);
        expect((DashboardContentComponent.containsMatchingElement(AddWorkerWrapper))).toEqual(true);
    })
});

});
