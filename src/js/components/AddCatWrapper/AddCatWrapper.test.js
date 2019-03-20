import React from 'react';
import {AddCatWrapper} from './AddCatWrapper';
import {mount} from "enzyme/build";
import AddCatForm from "../AddCatForm/AddCatForm";


describe('AddCatWrapper', function () {

  beforeEach(() => {
    this.wrapper = mount(<AddCatWrapper/>);
  });

  it('renders correctly', () => {
    expect(this.wrapper).toMatchSnapshot();
  });

  it('calls submit function  when  the form is submitted', async () => {
    const historyMock = {push: jest.fn()};
    const mockAddCatAction = jest.fn().mockResolvedValue(43);
    const props = {
      addCat: mockAddCatAction,
      history: historyMock
    };

    this.wrapper.setProps(props);

    const AddWorkerFormComponent = this.wrapper.find(AddCatForm);
    expect(mockAddCatAction.mock.calls.length).toBe(0);
    AddWorkerFormComponent.simulate('submit');
    expect(mockAddCatAction.mock.calls.length).toBe(1)
  });
});

