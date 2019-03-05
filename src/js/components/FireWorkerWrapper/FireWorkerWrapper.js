import React, {Component, Fragment} from 'react';
import actions from "../../reducers/actions";
import {connect} from "react-redux";
import {FireWorkerForm} from "../FireWorkerForm/FireWorkerForm";

export class FireWorkerWrapper extends Component {

    handleSubmit = (e, worker) => {
        e.preventDefault();
        this.props.findHome(worker).then(() => this.props.history.push('/'));
    };

    render() {
        return (
            <div>
                <FireWorkerForm onSubmit={this.handleSubmit} workers={this.props.workers}/>
                <img  className='cat-bg' src="/images/cat-bg-1.png" alt=""/>
            </div>
        );
    }
}

FireWorkerWrapper.propTypes = {};

export default connect((state) => ({workers: state.workers}),
    (dispatch) => ({findHome: (catID) => dispatch(actions.findHome(catID))}) )(FireWorkerWrapper);
