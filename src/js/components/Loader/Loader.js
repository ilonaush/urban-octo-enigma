import React from 'react';
import "./Loader.styl"
import {LOADING_TYPES} from "../../constants";

const Loader = ({loadingType}) => {
    switch(loadingType) {
        case LOADING_TYPES.FEED_CAT:
            return (
                <div className='loader'>
                    <img src="/images/feed-cat-loader.gif" alt=""/>
                </div>
            );
        case LOADING_TYPES.HUG_CAT:
            return (
                <div className='loader'>
                    <img src="/images/hug-cat-loader.gif" alt=""/>
                </div>
            );
        case LOADING_TYPES.WASH_CAT:
            return (
                <div className='loader'>
                    <img src="/images/wash-cat-loader.gif" alt=""/>
                </div>
            );
        default:
            return (
                <div className='loader'>
                    <img src="/images/blue-loader.gif" alt=""/>
                </div>
            );
    }
};

export default Loader;
