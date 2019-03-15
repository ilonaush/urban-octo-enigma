import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withRequest from "../RequestHOC/RequestHOC";
import {REQUEST_PATHS} from "../../constants";
import Loader from "../Loader/Loader";

const HistoryItem = ({cat: {name, address, date, family}}) => {
    return (
        <div className='table-row'>
            <div className='table-head table-row-item'>{name}</div>
            <div className='table-head table-row-item'>{address}</div>
            <div className='table-head table-row-item'>{family}</div>
            <div className='table-head table-row-item'>{date}</div>
        </div>
    )
};

class History extends Component {
    render() {
        debugger;
        const {history, loading} = this.props;
        if (loading) return <Loader/>;
        return (
            <div className='table'>
                <div className='table-row'>
                    <div className='table-head table-row-item'>Name</div>
                    <div className='table-head table-row-item'>Location</div>
                    <div className='table-head table-row-item'>Current address</div>
                    <div className='table-head table-row-item'>Date</div>
                </div>
                {history.map ((cat) =>
                    <HistoryItem key={cat.id} cat={cat}/>
                )}
            </div>
        );
    }
}

History.propTypes = {
    history: PropTypes.array,
    loading: PropTypes.bool
};


export default withRequest(History, {request: REQUEST_PATHS.GET_HISTORY, name: 'history'});
