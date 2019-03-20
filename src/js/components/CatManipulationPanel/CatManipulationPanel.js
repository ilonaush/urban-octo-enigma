import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import {connect} from "react-redux";
import actions from "../../reducers/actions";

class CatManipulationPanel extends Component {

  /**
   * handles feeding click
   */
  handleFeedingClick = () => {
    const feedingTime = moment().add(15, 'm').format();
    const cat = {
      ...this.props.cat,
      feedingTime,
    };
    this.props.feedCat(cat);
  };

  /**
   * handles hugging click
   */
  handleHugClick = () => {
    const huggingTime = moment().add(1, 'h').format();
    const cat = {
      ...this.props.cat,
      huggingTime,
    };
    this.props.hugCat(cat);
  };

  /**
   * handles washing click
   */
  handleWashClick = () => {
    const washingTime = moment().add(1, 'd').format();
    const cat = {
      ...this.props.cat,
      washingTime
    };
    this.props.washCat(cat);
  };

  /**
   * checks if the action button should be active or not
   * @param time
   * @returns {boolean}
   */
  isTimeToManipulate = (time) => {
    return moment().format() > moment(time).format();
  };

  render() {
    const {cat: {feedingTime, huggingTime, washingTime}} = this.props;
    return (
        <Fragment>
          <div className='table-row-item manipulation' id='feeding' onClick={this.handleFeedingClick}>
            {!feedingTime || this.isTimeToManipulate(feedingTime) ?
                <button className='btn-action' id='feeding-btn'>Feed cat</button>
                :
                `Next feeding ${moment(feedingTime).fromNow()}`
            }
          </div>
          <div className='table-row-item manipulation' id='hugging' onClick={this.handleHugClick}>
            {!huggingTime || this.isTimeToManipulate(huggingTime) ?
                <button className='btn-action'>Hug cat</button>
                :
                `Next hugging ${moment(huggingTime).fromNow()}`
            }
          </div>
          <div className='table-row-item manipulation' id='washing' onClick={this.handleWashClick}>
            {!washingTime || this.isTimeToManipulate(washingTime) ?
                <button className='btn-action'>Wash cat</button>
                :
                `Next washing ${moment(washingTime).fromNow()}`
            }
          </div>
        </Fragment>
    );
  }
}

CatManipulationPanel.propTypes = {
  feedCat: PropTypes.func,
  hugCat: PropTypes.func,
  washCat: PropTypes.func
};

export default connect(
    null,
    (dispatch) => ({
      feedCat: (cat) => dispatch(actions.feedCat(cat)),
      hugCat: (cat) => dispatch(actions.hugCat(cat)),
      washCat: (cat) => dispatch(actions.washCat(cat))
    })
)(CatManipulationPanel);

