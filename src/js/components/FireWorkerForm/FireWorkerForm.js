import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../reducers/actions';
import { bindActionCreators } from "redux";
import {Query} from "../../services/RequestService";
import "../AddWorkerForm/AddWorkerForm.styl";
import {withRouter} from "react-router-dom";
import RequestService from "../../services/RequestService";
import Loader from "../Loader/Loader";

export class FireWorkerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            worker: '',
            loading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleLoading = this.handleLoading.bind(this);

    }

    handleLoading(value) {
        debugger;
        this.setState({
            loading: value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.worker);
        this.props.actions.fireWorker(this.state.worker);
        const response = this.handleLoad('/fire-worker', {ID: this.state.worker});
    }

    handleSelect({target = null}) {
        console.log(target.value);
        this.setState({
            worker: target.value
        })
    }

    async handleLoad(path, payload) {
        this.handleLoading(true);
        console.log(payload);
        try {
            const response = await RequestService.patch(path, payload);
            console.log(response);
            if (response) {
                console.log(response);
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
                <form className='addWorkerForm'>
                    <select onChange={this.handleSelect}>
                        <option value=" ">Оберіть</option>
                        {this.props.workers.map((worker) =>
                            <option key={worker.id} value={worker.id} >{worker.fullname}</option>
                        )}
                    </select>
                    <textarea placeholder='Describe reason please'/>
                    <button type='submit' onClick={this.onSubmit}>Fire a worker</button>
                </form>
            </div>
        );
    }
}

FireWorkerForm.propTypes = {};


function mapStateToProps(state) {
    return { workers: state.workers  }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FireWorkerForm);
