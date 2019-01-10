import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import actions from "../../reducers/actions";
import connect from "react-redux/es/connect/connect";
import {AddWorkerForm} from "../AddWorkerForm/AddWorkerForm";
import {Query} from "../../services/RequestService";

class AddWorkerWrapper extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }
    handleSubmit(e, worker) {
        e.preventDefault();
        console.log(worker);
        worker = {
            fullname: `${worker.name} ${worker.surname}`,
            id: Date.now(),
            position: worker.position
        };
        console.log(worker);


        this.props.actions.employWorker(worker);
        const response = this.handleLoad();
    }

    async handleLoad() {
        this.props.handleLoading(true);
        const response = await Query();
        if (response) {
            this.props.handleLoading(false);
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <AddWorkerForm onSubmit={this.handleSubmit}/>
            </div>
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
