import React from 'react';
import ReactDOM from 'react-dom';
import ContentTitle from './ContentTitle';
import {mount, shallow} from "enzyme/build";
import renderer from "react-test-renderer";

describe('ContentTitle', () => {
    it('renders correctly without children', () => {
        const ContentTitleComponent = renderer.create(<ContentTitle/>);
        expect((ContentTitleComponent).toJSON()).toMatchSnapshot();
    });

    it('renders correctly with children', () => {
        const ContentTitleComponent = mount(
            <ContentTitle>
                Hello!
            </ContentTitle>
        );
        expect(ContentTitleComponent.text()).toEqual('Hello!');
    });
});
