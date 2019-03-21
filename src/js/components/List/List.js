import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./List.styl";
import actions from "../../reducers/actions";
import {connect} from "react-redux";
import ListItem from "../ListItem/ListItem";
import {Link} from "react-router-dom";

const CatTable = ({cats}) => {
  return (
      <div className='table'>
        <div className='table-row'>
          <div className='table-head table-row-item'>Ім'я</div>
          <div className='table-head table-row-item'>Вік</div>
          <div className='table-head table-row-item'>Колір</div>
          <div className='table-head table-row-item'>
            Покормити
          </div>
          <div className='table-head table-row-item'>
            Погладити a cat
          </div>
          <div className='table-head table-row-item'>
            Покупати
          </div>
        </div>
        {cats.map((cat) =>
            <ListItem key={cat.id} cat={cat}/>
        )}
      </div>
  );
};

class List extends Component {

    render() {
        const {loading, cats} = this.props;
        if (loading) {
            return null;
        }
        return (
            cats && cats.length ?
                <CatTable cats={cats}/>
                :
                <button className='home-add-btn'>
                    <Link to='/add-cat'>Accept a cat</Link>
                </button>
        )
    }
}

List.propTypes = {
  cats: PropTypes.array,
  feedCat: PropTypes.func,
  hugCat: PropTypes.func,
  washCat: PropTypes.func
};

export default connect(
    (state) => ({cats: state.cats, loading: state.loading}),
    (dispatch) => ({
      feedCat: (cat) => dispatch(actions.feedCat(cat)),
      hugCat: (cat) => dispatch(actions.hugCat(cat)),
      washCat: (cat) => dispatch(actions.washCat(cat))
    })
)(List);
