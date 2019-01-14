import React, {Component} from 'react';
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
        this.handleLoad = this.handleLoad.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
    }
    handleSubmit(e, worker) {
        e.preventDefault();
        console.log(worker);
        worker = {
            fullname: `${worker.name} ${worker.surname}`,
            id: Date.now(),
            position: worker.position
        };

        this.props.actions.employWorker(worker);
        const response = this.handleLoad('/add-worker', worker);
    }

    handleLoading(value) {
        debugger;
        this.setState({
            loading: value
        })
    }

    async handleLoad(path, payload) {
        this.handleLoading(true);
        let response;
        try {
            response = await RequestService.post(path, payload);
            if (response) {
                this.handleLoading(false);
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
                {this.state.loading ? <Loader/> : null}
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
