import React from 'react';
import ReactDOM from 'react-dom';
import {ListItem} from './ListItem';
import { mount } from 'enzyme';
import {Provider} from "react-redux";
import {store} from "../../reducers";
import {MemoryRouter} from "react-router-dom";


describe('ListItem', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter><Provider  store={store}><ListItem/></Provider></MemoryRouter>, div);
    });

    it('does not render button', () => {
        const cat =  {
            feedingTime: '2019-03-22T18:59:53+02:00'
        };
        const ListItemComponent = mount(<MemoryRouter><Provider store={store}><ListItem cat={cat}/></Provider></MemoryRouter>);
        expect(ListItemComponent.find('#feeding-btn').exists()).toBeFalsy();
    });

    it('renders button', () => {
        const ListItemComponentButton = mount(<MemoryRouter><Provider store={store}><ListItem/></Provider></MemoryRouter>);
        expect(ListItemComponentButton.find('#feeding-btn').exists()).toBeTruthy();
    });
});

