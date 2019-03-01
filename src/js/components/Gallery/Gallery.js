import React, {Component} from 'react';
import {connect} from "react-redux";
import LazyLoadImage from "../../tools/LazyLoad"
import "./Gallery.styl"
import PropTypes from 'prop-types';


export class Gallery extends Component {
    render() {
        const {workers} = this.props;
        return (
            <div className='workers-gallery'>
                {workers && workers.length ?
                    workers.map((item, index) => {
                        return (
                        <div className='worker-photo' key={item.id}>
                            <LazyLoadImage  src={`cat-${index}.jpg`}/>
                            <div className='worker-name'>{item.fullname}</div>
                            <div className='worker-position'>{item.position}</div>
                        </div>
                        )
                    })
                    : <div>Немає співробітників</div>}
            </div>
        );
    }
}

Gallery.propTypes = {
        workers: PropTypes.array
};

Gallery.defaultProps = {
        workers: []
};

export default connect((state) => ({workers: state.workers}))(Gallery);


