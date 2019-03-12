import React from 'react';
import ReactDOM from 'react-dom';
import {ListItem} from './ListItem';
import { mount } from 'enzyme';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListItem />, div);
});

it('does not render button', () => {
    const cat =  {
        feedingTime: '2019-03-14T10:59:53+02:00'
    };
    const ListItemComponent = mount(<ListItem cat={cat}/>);
    expect(ListItemComponent.find('#feeding-btn').exists()).toBeFalsy();
});

it('renders button', () => {
    const ListItemComponentButton = mount(<ListItem/>);
    console.log(ListItemComponentButton.props());
    expect(ListItemComponentButton.find('#feeding-btn').exists()).toBeTruthy();
});
