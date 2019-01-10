import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import AddWorkerForm from '../AddWorkerForm/AddWorkerForm'
import Input from "./Input";
import { shallow, mount, render } from 'enzyme';

it('renders correctly input  component ', () => {
    const InputComponent = renderer.create(<Input/>);
    expect((InputComponent).toJSON()).toMatchSnapshot();
});

it('checks whether class is aplied to the input', () => {
    const props = {
            className: 'beautiful'
        },
        InputComponent = mount(<Input {...props} />).find('input');
    expect(InputComponent.hasClass('beautiful')).toEqual(true);
});


it('render input correctly with null value', () => {
    const props = {
            value: null
        },
        InputComponent = mount(<Input {...props} />);
    expect((InputComponent).prop('value')).toEqual(null);
});

it('check the type of value', () => {
    const props = {
            value: 'meow'
        },
        InputComponent = mount(<Input {...props} />);
    expect(typeof InputComponent.prop('value')).toBe('string');
});

it('should handle onChange event', () => {
    const onChange = jest.fn(),
        props = {
            value: 'meow',
            onChange
        },
        InputComponentEl = shallow(<Input {...props} />).find('input');
    expect(InputComponentEl.prop('value')).toEqual('meow');
    let eventArgs = {target: {value: "meow-meow"}};
    InputComponentEl.simulate('change', eventArgs );
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenLastCalledWith(eventArgs);

});

// it('check value is changing', () => {
//     const AddFormComponent = mount(<AddWorkerForm />),
//           InputComponent = AddFormComponent.find(Input),
//           InputComponentEl = InputComponent.find('input');
//     let eventArgs = {target: {value: "meow-meow", name: 'name'}};
//     InputComponentEl.simulate('change', eventArgs );
//
//     expect(AddFormComponent.state().worker.name).toEqual(eventArgs.target.value);
// });

