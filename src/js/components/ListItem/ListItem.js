import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./ListItem.styl";
import MaskedInput from 'react-text-mask'
import RequestService from "../../services/RequestService";

class ListItem extends Component {
     constructor(props) {
         super(props);
         this.state = {
             editing: ''
         };
     }

    editTime = (e)  =>{
        this.setState({
            editing: e.currentTarget.id
        })
    };

    saveTime = ({target}) => {
        this.setState({
            editing: ''
        });
        const cat = {
            ...this.props.cat,
            [target.name]: target.value
        };
        this.props.editWorkerTime(cat);
    };

    render() {
     const {editing} = this.state;
     const {cat: {name, age, color, arrival = '', leaving = ''} = {}} = this.props;
        return (
            <tr>
                <td>{name}</td>
                <td>{age}</td>
                <td>{color}</td>
                <td id='arrival' onClick={this.editTime} onBlur={this.saveTime} className='worker-time'>
                    {editing === 'arrival' ? <MaskedInput
                        mask={[' ', /\d/,  /\d/, ':',  /\d/,  /\d/]}
                        className='time-input'
                        name='arrival'
                        guide={true}
                        placeholder='–-–:–-–'
                    />
                    : arrival ? arrival : 'Click to select'}
                </td>
                <td id='leaving' onClick={this.editTime} onBlur={this.saveTime} className='worker-time'>
                    {editing === 'leaving' ? <MaskedInput
                        mask={[/\d/,  /\d/, ':',  /\d/,  /\d/]}
                        className='time-input'
                        name='leaving'
                        guide={true}
                        placeholder='–-–:–-–'
                    />
                    : leaving ? leaving : 'Click to select'}
                </td>
            </tr>
        );
    }
}

ListItem.propTypes = {
    cat: PropTypes.object
};

ListItem.defaultProps = {
    cat: {}
};

export default ListItem;
