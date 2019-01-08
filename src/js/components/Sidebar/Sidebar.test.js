import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './Sidebar';
import {MemoryRouter} from "react-router";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><Sidebar /></MemoryRouter>, div);
});