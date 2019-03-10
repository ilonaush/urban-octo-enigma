import React from 'react';
import ReactDOM from 'react-dom';
import {ListItem} from './ListItem';
import { shallow, mount, render } from 'enzyme';
import {Provider} from "react-redux";
import {store} from '../../reducers/index';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><ListItem /></Provider>, div);
});

it('renders without worker info', () => {
    const ListItemComponent = mount(<Provider store={store}><ListItem/></Provider>);
    console.log(ListItemComponent.props())
    expect(typeof (ListItemComponent.prop('cat'))).toBe('object');
});

