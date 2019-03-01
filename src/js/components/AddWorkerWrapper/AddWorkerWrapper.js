import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import actions from "../../reducers/actions";
import {connect} from "react-redux";
import AddWorkerForm from "../AddWorkerForm/AddWorkerForm";

export class AddWorkerWrapper extends Component {

    handleSubmit = (e, worker) => {
        e.preventDefault();
        worker = {
            fullname: `${worker.name} ${worker.surname}`,
            id: Date.now(),
            position: worker.position
        };
        this.props.employWorker(worker)
    };

    render() {
        return (
            <Fragment>
                <AddWorkerForm onSubmit={this.handleSubmit}/>
            </Fragment>
        );
    }
}

AddWorkerWrapper.propTypes = {};

export default connect(
    (state) => ({workers: state.workers}),
    (dispatch) => ({employWorker: (worker) => dispatch(actions.employWorker(worker))})
)(AddWorkerWrapper);
