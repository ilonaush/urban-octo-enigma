import React from 'react';

import SidebarMenu  from './SidebarMenu';

import ReactDOM from 'react-dom';
import {MemoryRouter} from "react-router";

describe('SidebarMenu', () => {
    it('renders', () => {

        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter><SidebarMenu/></MemoryRouter>, div)
    })
})

