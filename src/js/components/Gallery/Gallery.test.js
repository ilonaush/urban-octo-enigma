import React from 'react';
import {Gallery}  from './Gallery';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import renderer from 'react-test-renderer';
import Loader from "../Loader/Loader";
import configureMockStore from 'redux-mock-store'
import { shallow, mount, render } from 'enzyme';

const mockStore = configureMockStore();
const store = mockStore({ workers: [{id: 1, fullname: 'mike', position: 'cat'}] });
const emptyStore = mockStore({});


it('renders correctly gallery component with mock store', () => {
    const GalleryComponent = renderer.create(<Provider store={store}><Gallery/></Provider>).toJSON();
    expect(GalleryComponent).toMatchSnapshot();
});


it('renders correctly gallery component with default parameters', () => {
    const GalleryComponent = mount(<Provider store={emptyStore}><Gallery/></Provider>);
    console.log(GalleryComponent.props().children.props.workers);
    expect(Array.isArray(GalleryComponent.props().children.props.workers)).toBe(true);
});


