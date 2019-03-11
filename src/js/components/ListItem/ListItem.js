import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./ListItem.styl";
import moment from 'moment';
import {connect} from "react-redux";
import actions from "../../reducers/actions";

moment.locale();

export class ListItem extends Component {

    handleFeedingClick = ()  => {
        const feedingTime = moment().add(15, 'm').format();
        const cat = {
             ...this.props.cat,
             feedingTime,
        };
        this.props.feedCat(cat);
    };

     handleHugClick = ()  =>{
         const huggingTime = moment().add(1, 'h').format();
         const cat = {
             ...this.props.cat,
             huggingTime,
         };
         this.props.hugCat(cat);
    };
     handleWashClick = ()  =>{
         const washingTime = moment().add(1, 'd').format();
         const cat = {
             ...this.props.cat,
             washingTime
         };
         this.props.washCat(cat);
    };

    isTimeToManipulate = (time) => {
        console.log(moment().format()  > moment(time).format());
        return  moment().format()  > moment(time).format();
    };

    render() {
     const {cat: {name, age, color, feedingTime, washingTime, huggingTime}} = this.props;
        return (
            <div className='table-row'>
                <div className='table-row-item' >{name}</div>
                <div className='table-row-item'>{age ? age : '-'}</div>
                <div className='table-row-item'>{color ? color : '-'}</div>
                <div className='table-row-item' id='feeding' onClick={this.handleFeedingClick}>
                    {!feedingTime || this.isTimeToManipulate(feedingTime) ?
                        <button className='btn-action' id='feeding-btn'>Feed cat</button>
                        :
                        `Next feeding: ${moment(feedingTime).format('HH:mm')}`
                    }
                </div>
                <div className='table-row-item' id='hugging' onClick={this.handleHugClick}>
                    {!huggingTime || this.isTimeToManipulate(huggingTime) ?
                        <button className='btn-action'>Hug cat</button>
                        :
                        `Next hugging: ${moment(huggingTime).format('HH:mm')}`
                    }
                </div>
                <div className='table-row-item' id='washing' onClick={this.handleWashClick}>
                    {!washingTime || this.isTimeToManipulate(washingTime) ?
                        <button className='btn-action'>Wash cat</button>
                        :
                        `Next washing: ${moment(washingTime).fromNow()}`
                    }
                </div>
            </div>
        );
    }
}

ListItem.propTypes = {
    cat: PropTypes.object
};

ListItem.defaultProps = {
    cat: {}
};

export default connect(
    null,
    (dispatch) => ({
        feedCat: (cat) => dispatch(actions.feedCat(cat)),
        hugCat: (cat) => dispatch(actions.hugCat(cat)),
        washCat: (cat) => dispatch(actions.washCat(cat))
    })
)(ListItem);
