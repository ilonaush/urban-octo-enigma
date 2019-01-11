import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "../AddWorkerForm/AddWorkerForm.styl";

export class FireWorkerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
           worker: ''
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
                <form className='addWorkerForm' onSubmit={(e) => this.onSubmit(e, this.state.worker)}>
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

FireWorkerForm.propTypes = {
    workers: PropTypes.array,
    onSubmit: PropTypes.func
};

FireWorkerForm.defaultProps = {
    workers: [],
};

export default FireWorkerForm;
