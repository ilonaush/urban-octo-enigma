import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import actions from "../../reducers/actions";
import {connect} from "react-redux";
import AddWorkerForm from "../AddWorkerForm/AddWorkerForm";
import {Query} from "../../services/RequestService";
import {FireWorkerForm} from "../FireWorkerForm/FireWorkerForm";

export class FireWorkerWrapper extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }


    handleSubmit(e, worker) {
        e.preventDefault();
        worker = {
            fullname: `${worker.name} ${worker.surname}`,
            id: Date.now(),
            position: worker.position
        };

        this.props.actions.employWorker(worker);
        const response = this.handleLoad();
    }

    async handleLoad() {
        this.props.handleLoading(true);
        try {
            const response = await Query();
            if (response) {
                console.log(response);
                this.props.handleLoading(false);
                this.props.history.push('/');
            }
        }
        catch (e) {
            console.log(e, 'error');
        }
    }

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
