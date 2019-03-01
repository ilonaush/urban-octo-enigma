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
            this.props.workers && this.props.workers.length ?
                (<table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Position
                        </th>
                        <th className='time'>
                            Arrival
                        </th>
                        <th className='time'>
                            Leaving
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.workers.map ((worker) =>
                        <ListItem key={worker.id} worker={worker} editWorkerTime={this.props.editWorkTime}/>
                     )}
                </tbody>
            </table>) :
            <button className='home-add-btn'><Link to='/add-worker'>Add worker</Link></button>
        );
    }
}

List.propTypes = {};

export default connect((state) => ({workers: state.workers}), (dispatch) => ({editWorkTime: (worker) => dispatch(actions.editWorkTime(worker))}))(List);
