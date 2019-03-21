import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withRequest from "../RequestHOC/RequestHOC";
import {REQUEST_PATHS} from "../../constants";
import moment from "moment";
import {connect} from "react-redux"

moment.locale('uk');

const HistoryItem = ({cat: {name, address, date, family}}) => {
  return (
      <div className='table-row'>
        <div className='table-row-item'>{name}</div>
        <div className='table-row-item'>{address}</div>
        <div className='table-row-item'>{family}</div>
        <div className='table-row-item'>{moment(date).format('Do MMMM YYYY')}</div>
      </div>
  )
};

class History extends Component {
  render() {
    const {catsHistory, loading} = this.props;
    if (loading) {
      return null;
    }
    return (
        <div className='table'>
          <div className='table-row'>
            <div className='table-head table-row-item'>Ім'я</div>
            <div className='table-head table-row-item'>Місцезнаходження</div>
            <div className='table-head table-row-item'>Сім'я</div>
            <div className='table-head table-row-item'>Дата</div>
          </div>
          {catsHistory && catsHistory.length && catsHistory.map((cat) =>
              <HistoryItem key={cat.id} cat={cat}/>
          )}
        </div>
    );
  }
}

History.propTypes = {
  catsHistory: PropTypes.array,
  loading: PropTypes.bool
};


export default connect(state => ({loading: state.loading}))(withRequest(History, {request: REQUEST_PATHS.GET_HISTORY, name: 'catsHistory'}));
