import React, {Component} from 'react';
import actions from "../../reducers/actions";
import {connect} from "react-redux";
import {FireWorkerForm} from "../FireWorkerForm/FireWorkerForm";

export class FireWorkerWrapper extends Component {

    handleSubmit = (e, worker) => {
        e.preventDefault();
        this.props.fireWorker(worker).then(() => this.props.history.push('/'));
    };

    render() {
        return (
            <div>
                <FireWorkerForm onSubmit={this.handleSubmit} workers={this.props.workers}/>
            </div>
        );
    }
}

FireWorkerWrapper.propTypes = {};

export default connect((state) => ({workers: state.workers}),
    (dispatch) => ({fireWorker: (workerID) => dispatch(actions.fireWorker(workerID))}) )(FireWorkerWrapper);
