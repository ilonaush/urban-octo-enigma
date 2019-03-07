import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import actions from "../../reducers/actions";
import {connect} from "react-redux";
import AddWorkerForm from "../AddWorkerForm/AddWorkerForm";
import  "./AddWorkerWrapper.styl";

export class AddWorkerWrapper extends Component {

    /**
     * handles submit on add WorkerForm, dispatches an action
     * @param e
     * @param cat
     */
    handleSubmit = (e, cat) => {
        e.preventDefault();
        cat = {
            name: `${cat.name}`,
            id: Date.now(),
            age: cat.age,
            color: cat.color,
            reason: cat.reason,
            location: cat.location,
            health: cat.health
        };
        this.props.addCat(cat).then(() => this.props.history.push('/'))
    };

    render() {
        return (
            <Fragment>
                <AddWorkerForm onSubmit={this.handleSubmit}/>
                <img  className='cat-bg' src="/images/cat-bg-2.png" alt=""/>
            </Fragment>
        );
    }
}

AddWorkerWrapper.propTypes = {};

export default connect(
    (state) => ({cats: state.cats}),
    (dispatch) => ({addCat: (cat) => dispatch(actions.addCat(cat))})
)(AddWorkerWrapper);
