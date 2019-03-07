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

    handleFeedingClick = (e)  => {
         const now = Date.now();
         const cat = {
             ...this.props.cat,
             feedingTime:  now.setHours((now.getHours() + 2))
         };
         console.log(cat.feedingTime);
        this.setState({
            editing: e.currentTarget.id
        })
    };

     handleHugClick = (e)  =>{
        this.setState({
            editing: e.currentTarget.id
        })
    };
     handleWashClick = (e)  =>{
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
     console.log(this.props);
        return (
            <tr>
                <td>{name}</td>
                <td>{age ? age : '-'}</td>
                <td>{color ? color : '-'}</td>
                <td id='feeding' onClick={this.handleFeedingClick}>
                    <button>Feed cat</button>
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
