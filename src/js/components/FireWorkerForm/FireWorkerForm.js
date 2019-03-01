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
            workerID: '',
        };
    }


    handleSelect = ({target = null}) => {
        this.setState({
            workerID: target.value
        })
    };

    render() {
        const {onSubmit, workers} = this.props;
        const {workerID} = this.state;
        return (
            <form className='fireWorkerForm' onSubmit={(e) => onSubmit(e, workerID)}>
                <select onChange={this.handleSelect}>
                    <option value=" ">Оберіть</option>
                    {workers.map((worker) =>
                        <option key={worker.id} value={worker.id} >{worker.fullname}</option>
                    )}
                </select>
                <textarea placeholder='Describe reason please'/>
                <button id='submit-btn' type='submit'>Fire a worker</button>
            </form>
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
