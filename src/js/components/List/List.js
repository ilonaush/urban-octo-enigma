import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./List.styl";
import actions from "../../reducers/actions";
import {connect} from "react-redux";
import ListItem from "../ListItem/ListItem";
import {Link} from "react-router-dom";

class List extends Component {
    render() {
        return (
            this.props.cats && this.props.cats.length ?
                (<table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Color</th>
                        <th className='feeding'>
                            Feed a cat
                        </th>
                        <th className='time'>
                            Hug a cat
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cats.map ((cat) =>
                        <ListItem key={cat.id} cat={cat} editWorkerTime={this.props.editWorkTime}/>
                     )}
                </tbody>
            </table>) :
            <button className='home-add-btn'><Link to='/add-worker'>Accept a cat</Link></button>
        );
    }
}

List.propTypes = {};

export default connect((state) => ({cats: state.cats}), (dispatch) => ({editWorkTime: (worker) => dispatch(actions.editWorkTime(worker))}))(List);
