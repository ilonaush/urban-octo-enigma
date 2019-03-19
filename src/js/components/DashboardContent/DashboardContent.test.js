import React from 'react';
import DashboardContent  from './DashboardContent';
import {shallow} from 'enzyme';


describe('DashboardContent', () => {
    it('renders correctly', () => {
        const DashboardContentComponent = shallow(
            <DashboardContent/>
        );
        expect(DashboardContentComponent).toMatchSnapshot();
    });
});

