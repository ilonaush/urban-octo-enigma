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
          <h3>Будь ласка, заповніть блан для прийому котика</h3>
          <Input id='name-input'
                 name='name'
                 placeholder="Ім'я"
                 onChange={this.handleChange}
                 value={cat.name}
                 required
          />
          <Input name='age'
                 placeholder='Вік'
                 onChange={this.handleChange}
                 value={cat.age}
                 required
          />
          <Input name='color'
                 placeholder='Колір'
                 onChange={this.handleChange}
                 value={cat.color}
                 required
          />
          <textarea name='reason'
                    placeholder='Причина прийому'
                    onChange={this.handleChange}
                    value={cat.reason}
          />
          <Input name='location'
                 placeholder='Місцезнаходження'
                 onChange={this.handleChange}
                 value={cat.location}
                 required
          />
          <select
              value={cat.health}
              name="health"
              onChange={this.handleChange}
              required
          >
            <option value="">Стан здоров'я</option>
            <option value="Satisfying">Satisfying</option>
            <option value="Minor problems">Minor problems</option>
            <option value="Not satisfying">Not satisfying</option>
          </select>
          <button id='submit-btn' type='submit'>Прийняти котика</button>
        </form>
    );
  }
}

AddCatForm.propTypes = {
  handleSubmit: PropTypes.func,
};

