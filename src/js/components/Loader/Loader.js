import React from 'react';
import "./Loader.styl"
import {LOADING_TYPES} from "../../constants";

const Loader = ({loadingType}) => {
    switch(loadingType) {
        case LOADING_TYPES.FEED_CAT:
            return (
                <div className='loader'>
                    <img src="/images/loaders/feed-cat-loader.gif" alt=""/>
                </div>
            );
        case LOADING_TYPES.HUG_CAT:
            return (
                <div className='loader'>
                    <img src="/images/loaders/hug-cat-loader.gif" alt=""/>
                </div>
            );
        case LOADING_TYPES.WASH_CAT:
            return (
                <div className='loader'>
                    <img src="/images/loaders/wash-cat-loader.gif" alt=""/>
                </div>
            );
        default:
            return (
                <div className='loader'>
                    <img src="/images/loaders/blue-loader.gif" alt=""/>
                </div>
            );
    }
};

export default Loader;
