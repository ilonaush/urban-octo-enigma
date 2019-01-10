import React, {Component} from 'react';
import "./AddWorkerForm.styl";

export class AddWorkerForm extends Component {

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
        console.log(this.props);
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
                    <button id='submit-btn' type='submit' onClick={(e) => this.props.onSubmit(e, this.state.worker)}>Employ a worker</button>
                </form>
            </div>
        );
    }
}

AddWorkerForm.propTypes = {};

