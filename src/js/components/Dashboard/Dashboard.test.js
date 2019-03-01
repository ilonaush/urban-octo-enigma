import React from 'react';
import Dashboard  from './Dashboard';
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "../../reducers/index";
import renderer from "react-test-renderer";
import Intro from "../Intro/Intro";
import { shallow, mount, render } from 'enzyme';
import Loader from "../Loader/Loader";



describe('Dashboard', () => {
    it('renders correctly', () => {
        const location = { pathname: '/' };
        const DashboardComponent = renderer.create(<MemoryRouter><Provider store={store}><Dashboard location={location}/></Provider></MemoryRouter>);
        expect((DashboardComponent).toJSON()).toMatchSnapshot();
    });

    it('renders correctly page info', () => {
        const props = {
            location : { pathname: '/add-worker' }
        };
        const DashboardComponent = mount(<MemoryRouter><Provider store={store}><Dashboard location={props.location}/></Provider></MemoryRouter>);
        const pageTitle = DashboardComponent.find(Intro).at(0);
        expect(pageTitle.text()).toEqual('Add worker');
    });

    it('has loader when such prop is submitted', () => {
        const props = {
            loading : true,
            location : { pathname: '/add-worker' }
        };
        const DashboardComponent = mount(<MemoryRouter><Provider store={store}><Dashboard {...props}/></Provider></MemoryRouter>);
        expect(DashboardComponent.containsMatchingElement(Loader)).toBeTruthy();
    })
});

