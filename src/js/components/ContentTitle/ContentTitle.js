import React from 'react';
import "./ContentTitle.styl";

const ContentTitle = ({children, style = {}, ...props}) => (
    <h3 className='content-title'>{children}</h3>
);


export default ContentTitle;
