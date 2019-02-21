import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import actions from "../../reducers/actions";
import {connect} from "react-redux";
import AddWorkerForm from "../AddWorkerForm/AddWorkerForm";
import {Query} from "../../services/RequestService";
import {FireWorkerForm} from "../FireWorkerForm/FireWorkerForm";
import RequestService from "../../services/RequestService";

export class FireWorkerWrapper extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e, worker) => {
        e.preventDefault();
        this.props.actions.fireWorker(worker);
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


function mapStateToProps(state) {
    return { workers: state.workers  }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FireWorkerWrapper);
