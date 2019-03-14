import React from 'react';
import ReactDOM from 'react-dom';
import {ListItem} from './ListItem';
import { mount } from 'enzyme';
import {Provider} from "react-redux";
import {store} from "../../reducers";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider  store={store}><ListItem/></Provider>, div);
});

it('does not render button', () => {
    const cat =  {
        feedingTime: '2019-03-14T10:59:53+02:00'
    };
    const ListItemComponent = mount(<Provider store={store}><ListItem cat={cat}/></Provider>);
    expect(ListItemComponent.find('#feeding-btn').exists()).toBeFalsy();
});

it('renders button', () => {
    const ListItemComponentButton = mount(<Provider store={store}><ListItem/></Provider>);
    console.log(ListItemComponentButton.props());
    expect(ListItemComponentButton.find('#feeding-btn').exists()).toBeTruthy();
});
