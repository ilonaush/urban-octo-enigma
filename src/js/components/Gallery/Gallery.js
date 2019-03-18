import React from 'react';
import {connect} from "react-redux";
import LazyLoadImage from "../../tools/LazyLoad"
import "./Gallery.styl"
import PropTypes from 'prop-types';


export const Gallery = ({cats}) =>  {
    return (
        <div className='workers-gallery'>
            {cats && cats.length ?
                cats.map((cat) => {
                    return (
                    <div className='worker-photo' key={cat.id}>
                        <LazyLoadImage height={200} src={`cat-avatars/${cat.img}`}/>
                        <div className='worker-name'>{cat.name}</div>
                        <div className='worker-position'>{cat.age}</div>
                    </div>
                    )
                })
                : <div>Немає котиків</div>
            }
        </div>
    );
};

Gallery.propTypes = {
        cats: PropTypes.array
};

Gallery.defaultProps = {
    cats: []
};

export default connect((state) => ({cats: state.cats}))(Gallery);


