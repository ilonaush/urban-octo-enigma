import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../reducers/actions';
import { bindActionCreators } from "redux";
import {Query} from "../../services/RequestService";
import "../AddWorkerForm/AddWorkerForm.styl";
import {withRouter} from "react-router-dom";

export class FireWorkerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
           worker: ''
        };

        // this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleLoad = this.handleLoad.bind(this);

    }

    onSubmit(e) {
        e.preventDefault();
        debugger;

        this.props.actions.fireWorker(this.state.worker);
        const response = this.handleLoad();
    }

    handleSelect({target = null}) {
        debugger;
        console.log(target.value);
        this.setState({
            worker: target.value
        })
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
                <form className='addWorkerForm'>
                    <select onChange={this.handleSelect}>
                        <option value=" ">Оберіть</option>
                        {this.props.workers.map((worker) =>
                            <option value={worker.id} >{worker.fullname}</option>
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
