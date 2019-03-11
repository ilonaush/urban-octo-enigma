import React, {Component} from 'react';
import "./AddWorkerForm.styl";
import Input from "../Input/Input";

export default class AddWorkerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cat: {
                name: '',
                age: '',
                color: '',
                reason: '',
                location: '',
                health: ''
            }
        };
    }

    /**
     * handles input change
     * @param value
     * @param name
     */
    handleChange = (value, name) => {
        this.setState((state) => ({
            cat: {
                ...state.cat,
                [name]: value
            }
        }))
    };

    render() {
        const {cat} = this.state;
        const {handleSubmit} = this.props;
        return (
            <form className='addWorkerForm' onSubmit={(e) => handleSubmit(e, cat)}>
                <h3>Please share some info about the cat with us</h3>
                <Input id='name-input'
                       name='name'
                       placeholder='Name'
                       onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                       value={cat.name}
                       required
                        />
                <Input name='age'
                       placeholder='Age'
                       onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                       value={cat.age}
                       required
                />
                <Input name='color'
                       placeholder='Color'
                       onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                       value={cat.color}
                       required
                />
                <textarea name='reason'
                       placeholder='Reason'
                       onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                       value={cat.reason}
                />
                <Input name='location'
                       placeholder='Location'
                       onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                       value={cat.location}
                       required
                />
                <Input name='health'
                       placeholder='Describe health'
                       onChange={(event) => this.handleChange(event.target.value, event.target.name)}
                       value={cat.health}
                       required
                />
                <button id='submit-btn' type='submit'>Accept the cat</button>
            </form>
        );
    }
}

AddWorkerForm.propTypes = {};

