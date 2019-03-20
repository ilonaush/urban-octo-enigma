import React from 'react';
import {FindHomeWrapper} from './FindHomeWrapper';
import {Provider} from "react-redux";
import {store} from "../../reducers/index";
import {mount, shallow} from "enzyme/build";
import FindHomeForm from "../FindHomeForm/FindHomeForm";


describe('FindHomeWrapper', function () {

  beforeEach(() => {
    this.wrapper = shallow(
        <FindHomeWrapper/>
    );
  });

  it('renders correctly', () => {
    expect(this.wrapper).toMatchSnapshot();
  });

  it('calls submit function  when  the form is submitted', async () => {
    const historyMock = {push: jest.fn()};
    const mockFindHomeAction = jest.fn().mockResolvedValue();
    const props = {
      findHome: mockFindHomeAction,
      history: historyMock
    };

    this.wrapper.setProps(props);

    const fireWorkerFormComponent = this.wrapper.find(FindHomeForm);
    expect(mockFindHomeAction.mock.calls.length).toBe(0);
    fireWorkerFormComponent.simulate('submit', {
      preventDefault: () => {
      }
    });
    expect(mockFindHomeAction.mock.calls.length).toBe(1)
  });
});

