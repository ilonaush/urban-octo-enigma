import React from 'react';
import Input from "./Input";
import {mount, shallow} from 'enzyme';

//setProps doesn't work properly on functional components
describe('Input', function () {

  it('renders correctly input  component ', () => {
    this.wrapper = mount(<Input/>);
    expect(this.wrapper).toMatchSnapshot();
  });

  it('checks whether class is applied to the input', () => {
    this.wrapper = mount(<Input className='beautiful'/>);
    const input = this.wrapper.find('input');
    expect(input.hasClass('beautiful')).toEqual(true);
  });

  it('render input correctly with no value', () => {
    const props = {onChange: jest.fn()};
    this.wrapper = mount(<Input {...props}/>);
    expect(this.wrapper.prop('value')).toEqual('');
  });

  it('check the type of value', () => {
    const props = {value: 'meow', onChange: jest.fn()};
    this.wrapper = mount(<Input {...props}/>);
    expect(typeof this.wrapper.prop('value')).toBe('string');
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
    InputComponentEl.simulate('change', eventArgs);
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenLastCalledWith(eventArgs);
  })
});







