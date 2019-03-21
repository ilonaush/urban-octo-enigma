import React from 'react';
import {Gallery} from './Gallery';
import {mount} from 'enzyme';

describe('Gallery', function () {

  beforeEach(() => {
    this.wrapper = mount(
        <Gallery/>
    );
  });

  it('renders correctly gallery component with mock store', () => {
    expect(this.wrapper).toMatchSnapshot();
  });

  it('renders correctly gallery component with default parameters', () => {
    expect(Array.isArray(this.wrapper.prop('cats'))).toBe(true);
  });

  it('renders correctly gallery component with default parameters', () => {
    expect(this.wrapper.find('.no-cats').text()).toBe('Немає котиків');
  });
});



