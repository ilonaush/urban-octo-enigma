import React from 'react';
import AddCatForm from './AddCatForm';
import {mount} from "enzyme/build";
import Input from "../Input/Input";

describe('AddCatForm', function () {

  beforeEach(() => {
    this.wrapper = mount(<AddCatForm/>)
  });

  it('renders correctly', () => {
    expect(this.wrapper).toMatchSnapshot();
  });

  it('calls submit function  when  the form is submitted', () => {
    const handleSubmit = jest.fn();

    this.wrapper.setProps({handleSubmit});

    const button = this.wrapper.find('#submit-btn');
    button.simulate('submit');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('change worker state when  the form is submitted', () => {
    const firstInput = this.wrapper.find(Input).at(0);
    expect(this.wrapper.state().cat.name).toEqual('');
    firstInput.simulate('change', {target: {value: 'mike', name: 'name'}});
    expect(this.wrapper.state().cat.name).toEqual('mike');
  });
});






