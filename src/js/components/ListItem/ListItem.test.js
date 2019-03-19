import React from 'react';
import {ListItem} from './ListItem';
import { mount, shallow } from 'enzyme';
import {Provider} from "react-redux";
import {store} from "../../reducers";
import {MemoryRouter} from "react-router-dom";


describe('ListItem', function () {

    beforeEach(() => {
        this.wrapper = shallow(
            <ListItem/>
        )
    });

    it('renders without crashing', () => {
        expect(this.wrapper).toMatchSnapshot();
    });

    it('does not render button', () => {
        const props =  {
            cat: {
                feedingTime: '2019-03-12T18:59:53+02:00'
            }
        };
        this.wrapper.setProps(props);
        expect(this.wrapper.find('#feeding-btn').exists()).toBeFalsy();
    });

    it('renders button', () => {
        const ListItemComponentButton = mount(<MemoryRouter><Provider store={store}><ListItem/></Provider></MemoryRouter>);
        expect(ListItemComponentButton.find('#feeding-btn').exists()).toBeTruthy();
    });
});

