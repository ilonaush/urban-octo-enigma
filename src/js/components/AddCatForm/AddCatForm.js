import React, {Component} from 'react';
import "./AddCatForm.styl";
import Input from "../Input/Input";
import PropTypes from 'prop-types';

export default class AddCatForm extends Component {

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
    handleChange = ({target: {value, name}}) => {
        this.setState((prevState) => ({
            cat: {
                ...prevState.cat,
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
                       onChange={this.handleChange}
                       value={cat.name}
                       required
                        />
                <Input name='age'
                       placeholder='Age'
                       onChange={this.handleChange}
                       value={cat.age}
                       required
                />
                <Input name='color'
                       placeholder='Color'
                       onChange={this.handleChange}
                       value={cat.color}
                       required
                />
                <textarea name='reason'
                       placeholder='Reason'
                       onChange={this.handleChange}
                       value={cat.reason}
                />
                <Input name='location'
                       placeholder='Location'
                       onChange={this.handleChange}
                       value={cat.location}
                       required
                />
                <select
                    value={cat.health}
                    name='health'
                    onChange={this.handleChange}>
                        <option value="Satisfying">Satisfying</option>
                        <option value="Minor problems">Minor problems</option>
                        <option value="Not satisfying">Not satisfying</option>
                </select>
                <button id='submit-btn' type='submit'>Accept the cat</button>
            </form>
        );
    }
}

AddCatForm.propTypes = {
    handleSubmit: PropTypes.func,
};

