import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import actions from "../../reducers/actions";
import {connect} from "react-redux";
import AddCatForm from "../AddCatForm/AddCatForm";
import "./AddCatWrapper.styl";

export class AddCatWrapper extends Component {

    /**
     * handles submit on add WorkerForm, dispatches an action
     * @param e
     * @param cat
     */
    handleSubmit = (e, cat) => {
        e.preventDefault();
        const catInfo = {
            name: cat.name,
            id: Date.now(),
            age: cat.age,
            color: cat.color,
            reason: cat.reason,
            location: cat.location,
            health: cat.health
        };
        this.props.addCat(catInfo).then(() => this.props.history.push('/'))
    };

    render() {
        return (
            <Fragment>
                <AddCatForm handleSubmit={this.handleSubmit}/>
                <img  className='cat-bg' src="/images/cat-bg-2.png" alt=""/>
            </Fragment>
        );
    }
}

AddCatWrapper.propTypes = {
    cats: PropTypes.array,
    addCat: PropTypes.func
};

export default connect(
    (state) => ({cats: state.cats}),
    (dispatch) => ({addCat: (cat) => dispatch(actions.addCat(cat))})
)(AddCatWrapper);
