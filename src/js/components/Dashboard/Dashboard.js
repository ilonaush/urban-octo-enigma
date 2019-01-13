import React, {Component} from 'react';
import './Dashboard.styl';
import Intro from "../Intro/Intro";
import DashboardContent from "../DashboardContent/DashboardContent";
import {connect} from "react-redux";
import { withRouter } from "react-router";
import {bindActionCreators, compose} from "redux";
import Loader from "../Loader/Loader";
import actions from "../../reducers/actions";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.getPage = this.getPage.bind(this);
    }

    getPage(path, pages = []) {
        return {
            ...pages.find((page) => page.path === path)
        };

    }




    render() {
        const PAGE = this.getPage(this.props.location.pathname, this.props.pages);
        return (
            <div className='dashboard'>
                <Intro>{PAGE.title}</Intro>
                <DashboardContent handleLoading={this.handleLoading}/>
            </div>
        );
    }
}

Dashboard.propTypes = {};

function mapStateToProps(state) {
    return { ...state  }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

