import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./ListItem.styl";
import CatManipulationPanel from "../CatManipulationPanel/CatManipulationPanel";
import {Link} from "react-router-dom";


export class ListItem extends Component {

  render() {
    const {cat: {name, age, color, id}} = this.props;
    return (
        <div className='table-row'>
          <div className='table-row-item'>
            <Link to={`/cat/${id}`}>{name}</Link>
          </div>
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
