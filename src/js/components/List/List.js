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
                            <button>Feed a cat</button>
                        </th>
                        <th className='time'>
                            <button>Hug a cat</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cats.map ((cat) =>
                        <ListItem key={cat.id} worker={cat} editWorkerTime={this.props.editWorkTime}/>
                     )}
                </tbody>
            </table>) :
            <button className='home-add-btn'><Link to='/add-worker'>Accept a cat</Link></button>
        );
    }
}

List.propTypes = {};

export default connect((state) => ({cats: state.cats}), (dispatch) => ({editWorkTime: (worker) => dispatch(actions.editWorkTime(worker))}))(List);
