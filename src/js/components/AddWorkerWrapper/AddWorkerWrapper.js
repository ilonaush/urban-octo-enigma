import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import actions from "../../reducers/actions";
import {connect} from "react-redux";
import AddWorkerForm from "../AddWorkerForm/AddWorkerForm";
import {Query} from "../../services/RequestService";
import RequestService from "../../services/RequestService";
import Loader from "../Loader/Loader";

export class AddWorkerWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e, worker) {
        e.preventDefault();
        worker = {
            fullname: `${worker.name} ${worker.surname}`,
            id: Date.now(),
            position: worker.position
        };
        this.props.actions.employWorker(worker)
    }

    render() {
        return (
            <Fragment>
                <AddWorkerForm onSubmit={this.handleSubmit}/>
            </Fragment>
        );
    }
}

AddWorkerWrapper.propTypes = {};


function mapStateToProps(state) {
    return { workers: state.workers  }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkerWrapper);
