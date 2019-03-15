import React, {Component, Fragment} from 'react';
import actions from "../../reducers/actions";
import {connect} from "react-redux";
import {FindHomeForm} from "../FindHomeForm/FindHomeForm";
import PropTypes from 'prop-types';
import moment from "moment";


export class FindHomeWrapper extends Component {

    handleSubmit = (e, cat) => {
        const variables = {
            ...cat,
            date: moment()
        };
        e.preventDefault();
        this.props.findHome(variables).then(() => this.props.history.push('/'));
    };

    render() {
        return (
            <div>
                <FindHomeForm onSubmit={this.handleSubmit} cats={this.props.cats}/>
                <img  className='cat-bg' src="/images/cat-bg-1.png" alt=""/>
            </div>
        );
    }
}

FindHomeWrapper.propTypes = {
    cats: PropTypes.array,
    findHome: PropTypes.func
};

export default connect((state) => ({cats: state.cats}),
    (dispatch) => ({findHome: (catID) => dispatch(actions.findHome(catID))}) )(FindHomeWrapper);
