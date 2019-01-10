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
        this.handleChange = this.handleChange.bind(this);
    }



    handleChange(value, name) {
        this.setState((state) => ({
            worker: {
                ...state.worker,
                [name]: value
            }
        }))
    }

    render() {
        return (
            <div>
                <form className='addWorkerForm' onSubmit={(e) => this.props.onSubmit(e, this.state.worker)}>
                    <Input id='name-input'
                           name='name'
                           placeholder='Name'
                           onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                           value={this.state.name}
                            />
                    <Input name='surname'
                           placeholder='Surname'
                           onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                           value={this.state.surname} />
                    <Input name='position'
                           placeholder='Position'
                           onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                           value={this.state.position}/>
                    <button id='submit-btn' type='submit'>Employ a worker</button>
                </form>
            </div>
        );
    }
}

AddWorkerForm.propTypes = {};

