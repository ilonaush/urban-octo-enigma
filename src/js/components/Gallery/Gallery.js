import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import actions from "../../reducers/actions";
import {connect} from "react-redux";
import LazyLoadImage from "../../tools/LazyLoad"
import "./Gallery.styl"
import PropTypes from 'prop-types';


export class Gallery extends Component {
    render() {
        console.log(this.props);
        return (
            <div className='workers-gallery'>
                {this.props.workers && this.props.workers.length ?
                    this.props.workers.map((item, index) => {
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



function mapStateToProps(state) {
    return { workers: state.workers  }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);


