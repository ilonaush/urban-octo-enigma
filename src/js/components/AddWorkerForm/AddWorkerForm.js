import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../reducers/actions';
import { bindActionCreators } from "redux";
import {Query} from "../../services/RequestService";
import "./AddWorkerForm.styl";
import {withRouter} from "react-router-dom";

export class AddWorkerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            position: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleLoad = this.handleLoad.bind(this);

    }

    onSubmit(e) {
        e.preventDefault();
        const worker = {
            fullname: `${this.state.name} ${this.state.surname}`,
            position: this.state.position,
            id: Date.now()
        };

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

    handleChange(value, name) {
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <form className='addWorkerForm'>
                    <input name='name'
                           placeholder='Name'
                           onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                           value={this.state.name}/>
                    <input name='surname'
                           placeholder='Surname'
                           onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                           value={this.state.surname} />
                    <input name='position'
                           placeholder='Position'
                           onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                           value={this.state.position}/>
                    <button type='submit' onClick={this.onSubmit}>Employ a worker</button>
                </form>
            </div>
        );
    }
}

AddWorkerForm.propTypes = {};


function mapStateToProps(state) {
    return { workers: state.workers  }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkerForm);
