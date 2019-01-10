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
                {this.props.workers.map((item) => {
                    return (
                    <div className='worker-photo' key={item.id}>
                        <LazyLoadImage  src='cat.jpg'/>
                        <div>{item.fullname}</div>
                    </div>
                    )
                })
                }
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


