import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./ListItem.styl";
import moment from 'moment';
import CatManipulationPanel from "../CatManipulationPanel/CatManipulationPanel";

moment.locale();

export class ListItem extends Component {

    render() {
     const {cat: {name, age, color}} = this.props;
        return (
            <div className='table-row'>
                <div className='table-row-item' >{name}</div>
                <div className='table-row-item'>{age ? age : '-'}</div>
                <div className='table-row-item'>{color ? color : '-'}</div>
                <CatManipulationPanel cat={this.props.cat}/>
            </div>
        );
    }
}

ListItem.propTypes = {
    cat: PropTypes.object,
};

ListItem.defaultProps = {
    cat: {}
};

export default ListItem;
