import React, {Component} from 'react';
import "./AddWorkerForm.styl";
import Input from "../Input/Input";

export default class AddWorkerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            worker: {
                name: '',
                surname: '',
                position: '',
            }
        };
    }

    handleChange = (value, name) => {
        this.setState((state) => ({
            worker: {
                ...state.worker,
                [name]: value
            }
        }))
    };

    render() {
        const {worker} = this.state;
        const {onSubmit} = this.props;
        return (
            <form className='addWorkerForm' onSubmit={(e) => onSubmit(e, worker)}>
                <Input id='name-input'
                       name='name'
                       placeholder='Name'
                       onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                       value={worker.name}
                        />
                <Input name='surname'
                       placeholder='Surname'
                       onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                       value={worker.surname} />
                <Input name='position'
                       placeholder='Position'
                       onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                       value={worker.position}/>
                <button id='submit-btn' type='submit'>Employ a worker</button>
            </form>
        );
    }
}

AddWorkerForm.propTypes = {};

