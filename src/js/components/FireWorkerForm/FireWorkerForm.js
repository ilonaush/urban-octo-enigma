import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./FireWorkerForm.styl";
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
        this.handleSelect = this.handleSelect.bind(this);
    }


    handleSelect({target = null}) {
        this.setState({
            worker: target.value
        })
    }


    render() {
        return (
            <div>
                <form className='fireWorkerForm' onSubmit={(e) => this.props.onSubmit(e, this.state.worker)}>
                    <select onChange={this.handleSelect}>
                        <option value=" ">Оберіть</option>
                        {this.props.workers.map((worker) =>
                            <option key={worker.id} value={worker.id} >{worker.fullname}</option>
                        )}
                    </select>
                    <textarea placeholder='Describe reason please'/>
                    <button id='submit-btn' type='submit'>Fire a worker</button>
                </form>
            </div>
        );
    }
}

FireWorkerForm.propTypes = {
    workers: PropTypes.array,
    onSubmit: PropTypes.func
};

FireWorkerForm.defaultProps = {
    workers: [],
};

export default FireWorkerForm;
