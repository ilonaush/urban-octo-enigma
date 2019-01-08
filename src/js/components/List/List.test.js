import React from 'react';

import List  from './List';

import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from "../../reducers/index";
import SidebarMenu from "../SIdebarMenu/SidebarMenu";
import {MemoryRouter} from "react-router";

describe('List', () => {
    it('renders', () => {

        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter><Provider store={store}><List/></Provider></MemoryRouter>, div)
    })
})