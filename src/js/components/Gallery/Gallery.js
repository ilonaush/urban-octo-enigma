import React, {Component} from 'react';
import {connect} from "react-redux";
import LazyLoadImage from "../../tools/LazyLoad"
import "./Gallery.styl"
import PropTypes from 'prop-types';


export class Gallery extends Component {
    render() {
        const {cats} = this.props;
        return (
            <div className='workers-gallery'>
                {cats && cats.length ?
                    cats.map((cat, index) => {
                        return (
                        <div className='worker-photo' key={cat.id}>
                            <LazyLoadImage  src={`cat-${index}.jpg`}/>
                            <div className='worker-name'>{cat.name}</div>
                            <div className='worker-position'>{cat.age}</div>
                        </div>
                        )
                    })
                    : <div>Немає котиків</div>}
            </div>
        );
    }
}

Gallery.propTypes = {
        cats: PropTypes.array
};

Gallery.defaultProps = {
    cats: []
};

export default connect((state) => ({cats: state.cats}))(Gallery);


