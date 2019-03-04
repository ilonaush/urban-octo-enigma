import React from 'react';

import Layout  from './Layout';
import { shallow, mount, render } from 'enzyme';
import ReactDOM from 'react-dom';
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "../../reducers/index";
import renderer from "react-test-renderer";
import Intro from "../Intro/Intro";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";


describe('Layout', () => {
    it('renders correctly', () => {
        const LayoutComponent = renderer.create(
            <MemoryRouter>
                <Provider store={store}>
                    <Layout/>
                </Provider>
            </MemoryRouter>
        ).toJSON();
        expect(LayoutComponent).toMatchSnapshot();
    });

    it('always renders sidebar and dashboard', () => {
        const props = {
            location: {
                pathname: '/'
            }
        };
        let LayoutComponent = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <Layout {...props}/>
                </Provider>
            </MemoryRouter>
        );
        expect(LayoutComponent.contains(Sidebar)).toEqual(true);
        expect(LayoutComponent.contains(Dashboard)).toEqual(true);

        props.location.pathname = '/fire-worker';
        LayoutComponent = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <Layout {...props}/>
                </Provider>
            </MemoryRouter>
        );
        expect(LayoutComponent.contains(Sidebar)).toEqual(true);
        expect(LayoutComponent.contains(Dashboard)).toEqual(true);
    })
})
