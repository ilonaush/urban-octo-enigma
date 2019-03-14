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
                <div className='table-head table-row-item'>Name</div>
                <div className='table-head table-row-item'>Age</div>
                <div className='table-head table-row-item'>Color</div>
                <div className='table-head table-row-item'>
                    Feed a cat
                </div>
                <div className='table-head table-row-item'>
                    Hug a cat
                </div>
                <div className='table-head table-row-item'>
                    Wash a cat
                </div>
            </div>
            {cats.map ((cat) =>
                <ListItem key={cat.id} cat={cat}/>
            )}
        </div>
    );
};

const List = ({cats}) => {
    return (
        cats && cats.length ?
            <CatTable cats={cats}/>
            :
            <button className='home-add-btn'>
                <Link to='/add-cat'>Accept a cat</Link>
            </button>
    )
};

List.propTypes = {
    cats: PropTypes.array,
    feedCat: PropTypes.func,
    hugCat:  PropTypes.func,
    washCat:  PropTypes.func
};


export default connect(
    (state) => ({cats: state.cats}),
    (dispatch) => ({
        feedCat: (cat) => dispatch(actions.feedCat(cat)),
        hugCat: (cat) => dispatch(actions.hugCat(cat)),
        washCat: (cat) => dispatch(actions.washCat(cat))
        })
)(List);
