import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./FindHomeForm.styl";
import Input from "../Input/Input";

export class FindHomeForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            catID: '',
        };
    }


    handleSelect = ({target = null}) => {
        this.setState({
            catID: target.value
        })
    };

    render() {
        const {onSubmit, cats} = this.props;
        const {catID} = this.state;
        return (
            <form className='fireWorkerForm' onSubmit={(e) => onSubmit(e, catID)}>
                <select onChange={this.handleSelect}>
                    <option value=" ">Choose the meowy</option>
                    {cats.map((cat) =>
                        <option key={cat.id} value={cat.id} >{cat.name}, {cat.age}</option>
                    )}
                </select>
                <Input placeholder='Location of future home'/>
                <textarea placeholder='Describe the family please'/>
                <button id='submit-btn' type='submit'>Find home for the cat</button>
            </form>
        );
    }
}

FindHomeForm.propTypes = {
    cats: PropTypes.array,
    onSubmit: PropTypes.func
};

FindHomeForm.defaultProps = {
    cats: [],
};

export default FindHomeForm;
