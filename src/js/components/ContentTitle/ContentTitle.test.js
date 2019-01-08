import React from 'react';
import ReactDOM from 'react-dom';
import ContentTitle from './ContentTitle';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ContentTitle />, div);
});