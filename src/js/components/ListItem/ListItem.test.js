import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './ListItem';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';



it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListItem />, div);
});

it('renders without worker info', () => {
    const ListItemComponent = mount(<ListItem/>);
    expect(typeof (ListItemComponent.prop('worker'))).toBe('object');
});

// it('check the onChange callback', () => {
//     const onChange = jest.fn(),
//         onClick = jest.fn(),
//         props = {
//             value: '13:04',
//             onChange
//         },
//         ListItemComponentInput = mount(<ListItem/>).find('#arrival');
//
//     ListItemComponentInput.simulate('click');
//     ListItemComponentInput.simulate('change', { target: {value: '12:12'} });
//     expect(onChange).toHaveBeenCalledWith('12:12');
// });
