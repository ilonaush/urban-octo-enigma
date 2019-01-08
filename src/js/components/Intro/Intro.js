import "./Intro.styl";
import React from 'react';

const Intro = ({children, ...props}) => {
    return (
    <div className='intro'>
        {children}
    </div>
    )
};

export default Intro;
